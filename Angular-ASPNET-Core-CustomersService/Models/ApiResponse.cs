using Angular_ASPNETCore_CustomersService.Models.Customers;
using Angular_ASPNETCore_CustomersService.Models.Devices;
using Angular_ASPNETCore_CustomersService.Models.SIMCards;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_CustomersService.Models
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public Customer Customer { get; set; }
        public Device Device { get; set; }
        public ModelStateDictionary ModelState { get; set; }

        public SIMCard SIMCard { get; set; }
    }
}
