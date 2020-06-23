using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_CustomersService.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //NOTES: once the home page loads, angular kicks in
            return View();
        }
    }
}