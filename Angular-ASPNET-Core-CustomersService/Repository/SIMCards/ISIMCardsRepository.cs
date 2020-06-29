using System.Collections.Generic;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Models;
using Angular_ASPNETCore_CustomersService.Models.SIMCards;

namespace Angular_ASPNETCore_SIMCardsService.Repository.SIMCards
{
    public interface ISIMCardsRepository
    {     
        Task<List<SIMCard>> GetSIMCardsAsync();
        Task<PagingResult<SIMCard>> GetSIMCardsPageAsync(int skip, int take);
        Task<SIMCard> GetSIMCardAsync(int id);
        
        Task<SIMCard> InsertSIMCardAsync(SIMCard SIMCard);
        Task<bool> UpdateSIMCardAsync(SIMCard SIMCard);
        Task<bool> DeleteSIMCardAsync(int id);
    }
}