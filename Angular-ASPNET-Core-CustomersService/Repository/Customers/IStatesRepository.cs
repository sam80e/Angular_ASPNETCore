using System.Collections.Generic;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Models;
using Angular_ASPNETCore_CustomersService.Models.Customers;

namespace Angular_ASPNETCore_CustomersService.Repository.Customers
{
    public interface IStatesRepository
    {
        Task<List<State>> GetStatesAsync();
    }
}