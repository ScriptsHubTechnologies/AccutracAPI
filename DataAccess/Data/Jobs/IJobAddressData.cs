using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IJobAddressData
    {
        Task<JobAddressModel?> GetJobAddress(string id, string company_code);
        Task<IEnumerable<JobAddressModel>> GetJobAddresses();
        Task<int> InsertJobAddress(JobAddressModel jobaddress);
        Task UpdateJobAddress(JobAddressModel jobaddress);
        Task<int> InsertAttachments(Attachment attachment);
        Task<List<JobAddressModel>> GetAttachementByCompany(string company_code, string id, string custid);
        Task<JobAddressModel> GetAttachementById(string attachmentId);
    }
}
