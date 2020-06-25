using System;

namespace Angular_ASPNETCore_CustomersService.Models.Devices
{
    public class Device
    {
        public int Id { get; set; }
        public string DeviceName { get; set; }
        public int? Tenant { get; set; }
        public DateTime? DateAdded { get; set; }
        public int? SIMCardId { get; set; }
    }
}
