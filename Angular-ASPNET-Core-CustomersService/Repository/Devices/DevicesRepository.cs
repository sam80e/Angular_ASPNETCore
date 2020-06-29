using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Angular_ASPNETCore_CustomersService.Models.Devices;
using Angular_ASPNETCore_CustomersService.Models;

namespace Angular_ASPNETCore_DevicesService.Repository.Devices
{
    public class DevicesRepository : IDevicesRepository
    {

        private readonly DeviceManagerDbContext _Context;
        private readonly ILogger _Logger;

        public DevicesRepository(DeviceManagerDbContext context, ILoggerFactory loggerFactory) {
          _Context = context;
          _Logger = loggerFactory.CreateLogger("DevicesRepository");
        }

        public async Task<List<Device>> GetDevicesAsync()
        {
            return await _Context.Devices.OrderBy(c => c.Id)
                                 .ToListAsync();
        }

        public async Task<PagingResult<Device>> GetDevicesPageAsync(int skip, int take)
        {
            var totalRecords = await _Context.Devices.CountAsync();
            var Devices = await _Context.Devices
                                 .OrderBy(c => c.Id)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToListAsync();
            return new PagingResult<Device>(Devices, totalRecords);
        }

        public async Task<Device> GetDeviceAsync(int id)
        {
            return await _Context.Devices.FindAsync(id);
        }

        public async Task<Device> InsertDeviceAsync(Device Device)
        {
            _Context.Add(Device);
            try
            {
              await _Context.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
               _Logger.LogError($"Error in {nameof(InsertDeviceAsync)}: " + exp.Message);
            }

            return Device;
        }

        public async Task<bool> UpdateDeviceAsync(Device Device)
        {
            //Will update all properties of the Device
            Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Device> entityEntry = _Context.Devices.Attach(Device);
            _Context.Entry(Device).State = EntityState.Modified;
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
               _Logger.LogError($"Error in {nameof(UpdateDeviceAsync)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteDeviceAsync(int id)
        {
            var Device = await _Context.Devices.FindAsync(id);
            _Context.Remove(Device);
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
               _Logger.LogError($"Error in {nameof(DeleteDeviceAsync)}: " + exp.Message);
            }
            return false;
        }

    }
}