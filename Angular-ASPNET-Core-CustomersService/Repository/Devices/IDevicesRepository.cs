using System.Collections.Generic;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Models;
using Angular_ASPNETCore_CustomersService.Models.Devices;

namespace Angular_ASPNETCore_DevicesService.Repository.Devices
{
    public interface IDevicesRepository
    {     
        Task<List<Device>> GetDevicesAsync();
        Task<PagingResult<Device>> GetDevicesPageAsync(int skip, int take);
        Task<Device> GetDeviceAsync(int id);
        
        Task<Device> InsertDeviceAsync(Device Device);
        Task<bool> UpdateDeviceAsync(Device Device);
        Task<bool> DeleteDeviceAsync(int id);
    }
}