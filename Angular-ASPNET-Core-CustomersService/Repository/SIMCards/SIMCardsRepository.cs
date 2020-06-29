using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Angular_ASPNETCore_CustomersService.Models.SIMCards;
using Angular_ASPNETCore_CustomersService.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Angular_ASPNETCore_DevicesService.Repository;

namespace Angular_ASPNETCore_SIMCardsService.Repository.SIMCards
{
    public class SIMCardsRepository : ISIMCardsRepository
    {

        private readonly DeviceManagerDbContext _Context;
        private readonly ILogger _Logger;

        public SIMCardsRepository(DeviceManagerDbContext context, ILoggerFactory loggerFactory) {
          _Context = context;
          _Logger = loggerFactory.CreateLogger("SIMCardsRepository");
        }

        public async Task<List<SIMCard>> GetSIMCardsAsync()
        {
            return await _Context.SIMCards.OrderBy(c => c.Id).ToListAsync();
        }

        public async Task<PagingResult<SIMCard>> GetSIMCardsPageAsync(int skip, int take)
        {
            var totalRecords = await _Context.SIMCards.CountAsync();
            var SIMCards = await _Context.SIMCards
                                 .OrderBy(c => c.Id)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToListAsync();
            return new PagingResult<SIMCard>(SIMCards, totalRecords);
        }

        public async Task<SIMCard> GetSIMCardAsync(int id)
        {
            return await _Context.SIMCards.FindAsync(id);
        }

        public async Task<SIMCard> InsertSIMCardAsync(SIMCard SIMCard)
        {
            _Context.Add(SIMCard);
            try
            {
              await _Context.SaveChangesAsync();
            }
            catch (Exception exp)
            {
               _Logger.LogError($"Error in {nameof(InsertSIMCardAsync)}: " + exp.Message);
            }

            return SIMCard;
        }

        public async Task<bool> UpdateSIMCardAsync(SIMCard SIMCard)
        {
            //Will update all properties of the SIMCard
            Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<SIMCard> entityEntry = _Context.SIMCards.Attach(SIMCard);
            _Context.Entry(SIMCard).State = EntityState.Modified;
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
               _Logger.LogError($"Error in {nameof(UpdateSIMCardAsync)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteSIMCardAsync(int id)
        {
            var SIMCard = await _Context.SIMCards.FindAsync(id);
            _Context.Remove(SIMCard);
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
               _Logger.LogError($"Error in {nameof(DeleteSIMCardAsync)}: " + exp.Message);
            }
            return false;
        }

    }
}