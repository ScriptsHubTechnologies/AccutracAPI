using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IJobAddressData
    {
        Task<JobAddressModel?> GetJobAddress(string id, string company_code);
        Task<IEnumerable<JobAddressModel>> GetJobAddresses();
        Task<int>InsertJobAddress(JobAddressModel jobaddress);
        Task UpdateJobAddress(JobAddressModel jobaddress);
        Task<int> InsertAttachments(Attachment attachment);
        Task<JobAddressModel> GetAttachementById(string cc, string id, string custid);
    }
}
