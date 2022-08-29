using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IJobAddressData
    {
        Task<JobAddressModel?> GetJobAddress(string id, string company_code);
        Task<IEnumerable<JobAddressModel>> GetJobAddresses();
        Task<int> InsertJobAddress(JobAddressModel jobaddress);
        Task UpdateJobAddress(JobAddressModel jobaddress);        
    }
}
