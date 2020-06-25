using Angular_ASPNETCore_CustomersService.Infrastructure;
using Angular_ASPNETCore_CustomersService.Models;
using Angular_ASPNETCore_CustomersService.Models.Devices;
using Angular_ASPNETCore_DevicesService.Repository.Devices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_DevicesService.Apis
{
    [Route("api/devices")]
    public class DevicesApiController : Controller
    {
        IDevicesRepository _DevicesRepository;
        ILogger _Logger;

        public DevicesApiController(IDevicesRepository DevicesRepo, ILoggerFactory loggerFactory) {
            _DevicesRepository = DevicesRepo;
            _Logger = loggerFactory.CreateLogger(nameof(DevicesApiController));
        }

        // GET api/Devices
        [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<Device>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Devices()
        {
            try
            {
                var devices = await _DevicesRepository.GetDevicesAsync();
                return Ok(devices);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/Devices/page/10/10
        [HttpGet("page/{skip}/{take}")]
        [NoCache]
        [ProducesResponseType(typeof(List<Device>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> DevicesPage(int skip, int take)
        {
            try
            {
                var pagingResult = await _DevicesRepository.GetDevicesPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
                return Ok(pagingResult.Records);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/Devices/5
        [HttpGet("{id}", Name = "GetDeviceRoute")]
        [NoCache]
        [ProducesResponseType(typeof(Device), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Devices(int id)
        {
            try
            {
                var device = await _DevicesRepository.GetDeviceAsync(id);
                return Ok(device);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/Devices
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateDevice([FromBody]Device Device)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newDevice = await _DevicesRepository.InsertDeviceAsync(Device);
                if (newDevice == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return CreatedAtRoute("GetDeviceRoute", new { id = newDevice.Id },
                        new ApiResponse { Status = true, Device = newDevice });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // PUT api/Devices/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UpdateDevice(int id, [FromBody]Device Device)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _DevicesRepository.UpdateDeviceAsync(Device);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true, Device = Device });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // DELETE api/Devices/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> DeleteDevice(int id)
        {
            try
            {
                var status = await _DevicesRepository.DeleteDeviceAsync(id);
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
