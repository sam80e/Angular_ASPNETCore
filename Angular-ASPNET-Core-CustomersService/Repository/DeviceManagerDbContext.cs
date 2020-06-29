using Microsoft.EntityFrameworkCore;
using Angular_ASPNETCore_CustomersService.Models.Devices;
using Angular_ASPNETCore_CustomersService.Models.SIMCards;

namespace Angular_ASPNETCore_DevicesService.Repository
{
    public class DeviceManagerDbContext : DbContext
    {
        public DbSet<Device> Devices { get; set; }
        public DbSet<SIMCard> SIMCards { get; set; }

        public DeviceManagerDbContext (DbContextOptions<DeviceManagerDbContext> options) : base(options) { }
    }
}