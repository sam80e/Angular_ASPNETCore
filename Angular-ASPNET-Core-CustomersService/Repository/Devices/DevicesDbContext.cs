using Microsoft.EntityFrameworkCore;
using Angular_ASPNETCore_CustomersService.Models.Devices;

namespace Angular_ASPNETCore_DevicesService.Repository.Devices
{
    public class DevicesDbContext : DbContext
    {
        public DbSet<Device> Devices { get; set; }
        public DevicesDbContext (DbContextOptions<DevicesDbContext> options) : base(options) { }
    }
}