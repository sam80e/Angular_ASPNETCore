using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Swagger;
using Angular_ASPNETCore_CustomersService.Repository.Customers;
using Angular_ASPNETCore_DevicesService.Repository.Devices;
using Angular_ASPNETCore_SIMCardsService.Repository.SIMCards;
using Angular_ASPNETCore_DevicesService.Repository;

namespace Angular_ASPNETCore_CustomersService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add PostgreSQL support
            //services.AddDbContext<CustomersDbContext>(options => {
            //    options.UseNpgsql(Configuration.GetConnectionString("CustomersPostgresConnectionString"));
            //});

            //Add SQL Server support
            services.AddDbContext<CustomersDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("CustomersSqlServerConnectionString"));
            });
            services.AddDbContext<DeviceManagerDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DeviceManagerSQLServerConnection"));
            });

            //Add SqLite support
            //services.AddDbContext<CustomersDbContext>(options => {
            //    options.UseSqlite(Configuration.GetConnectionString("CustomersSqliteConnectionString"));
            //});

            services.AddMvc();

            //Handle XSRF Name for Header
            services.AddAntiforgery(options => {
                options.HeaderName = "X-XSRF-TOKEN";
            });

            services.AddScoped<ICustomersRepository, CustomersRepository>();
            services.AddScoped<IStatesRepository, StatesRepository>();
            services.AddScoped<IDevicesRepository, DevicesRepository>();
            services.AddScoped<ISIMCardsRepository, SIMCardsRepository>();

            services.AddTransient<CustomersDbSeeder>();

            //https://github.com/domaindrivendev/Swashbuckle.AspNetCore
            //https://localhost:2500/swagger
            services.AddSwaggerGen(options =>
            {
                //TODO: Exploring the project structure 
                options.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "ASP.NET Core Customers API",
                    Description = "ASP.NET Core/Angular Customers Swagger Documentation",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Sam Eltringham", Url = "https://www.linkedin.com/in/samantha-eltringham-51332227/" },
                    License = new License { Name = "MIT", Url = "https://en.wikipedia.org/wiki/MIT_License" }
                });

                //Add XML comment document by uncommenting the following
                // var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "MyApi.xml");
                // options.IncludeXmlComments(filePath);

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, CustomersDbSeeder customersDbSeeder, IAntiforgery antiforgery)
        {
            //Manually handle setting XSRF cookie. Needed because HttpOnly has to be set to false so that
            //Angular is able to read/access the cookie.
            app.Use((context, next) =>
            {
                if (context.Request.Method == HttpMethods.Get &&
                    (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(context.Request.Path.Value, "/home/index", StringComparison.OrdinalIgnoreCase)))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", 
                        tokens.RequestToken,
                        new CookieOptions() { HttpOnly = false });
                }

                return next();
            });

            // Serve wwwroot as root
            app.UseFileServer();

            // Serve /node_modules as a separate root (for packages that use other npm modules client side)
            // Added for convenience for those who don't want to worry about running 'gulp copy:libs'
            // Only use in development mode!!
            app.UseFileServer(new FileServerOptions()
            {
                // Set root of file server
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules",
                EnableDirectoryBrowsing = false
            });

            //This would need to be locked down as needed (very open right now)
            app.UseCors((corsPolicyBuilder) => 
            {
                corsPolicyBuilder.AllowAnyOrigin();
                corsPolicyBuilder.AllowAnyMethod();
                corsPolicyBuilder.AllowAnyHeader();
                corsPolicyBuilder.WithExposedHeaders("X-InlineCount");
            });

            app.UseStaticFiles();

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            // Visit http://localhost:2500/swagger
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                //NOTES: this allows angular routes to work 
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });

            });

            customersDbSeeder.SeedAsync(app.ApplicationServices).Wait();
        }
    }
}
