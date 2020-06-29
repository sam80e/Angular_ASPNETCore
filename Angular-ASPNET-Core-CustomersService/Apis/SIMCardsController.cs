using Angular_ASPNETCore_CustomersService.Infrastructure;
using Angular_ASPNETCore_CustomersService.Models;
using Angular_ASPNETCore_CustomersService.Models.SIMCards;
using Angular_ASPNETCore_SIMCardsService.Repository.SIMCards;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_SIMCardsService.Apis
{
    [Route("api/simcards")]
    public class SIMCardsAPIController : Controller
    {
        ISIMCardsRepository _SIMCardsRepository;
        ILogger _Logger;

        public SIMCardsAPIController(ISIMCardsRepository SIMCardsRepo, ILoggerFactory loggerFactory) {
            _SIMCardsRepository = SIMCardsRepo;
            _Logger = loggerFactory.CreateLogger(nameof(SIMCardsAPIController));
        }

        // GET api/SIMCards
        [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<SIMCard>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> SIMCards()
        {
            try
            {
                var simcards = await _SIMCardsRepository.GetSIMCardsAsync();
                return Ok(simcards);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/SIMCards/page/10/10
        [HttpGet("page/{skip}/{take}")]
        [NoCache]
        [ProducesResponseType(typeof(List<SIMCard>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> SIMCardsPage(int skip, int take)
        {
            try
            {
                var pagingResult = await _SIMCardsRepository.GetSIMCardsPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
                return Ok(pagingResult.Records);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/SIMCards/5
        [HttpGet("{id}", Name = "GetSIMCardRoute")]
        [NoCache]
        [ProducesResponseType(typeof(SIMCard), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> SIMCards(int id)
        {
            try
            {
                var device = await _SIMCardsRepository.GetSIMCardAsync(id);
                return Ok(device);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/SIMCards
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateSIMCard([FromBody] SIMCard SIMCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newSIMCard = await _SIMCardsRepository.InsertSIMCardAsync(SIMCard);
                if (newSIMCard == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return CreatedAtRoute("GetSIMCardRoute", new { id = newSIMCard.Id },
                        new ApiResponse { Status = true, SIMCard = newSIMCard });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // PUT api/SIMCards/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UpdateSIMCard(int id, [FromBody] SIMCard SIMCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _SIMCardsRepository.UpdateSIMCardAsync(SIMCard);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true, SIMCard = SIMCard });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // DELETE api/SIMCards/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> DeleteSIMCard(int id)
        {
            try
            {
                var status = await _SIMCardsRepository.DeleteSIMCardAsync(id);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}
