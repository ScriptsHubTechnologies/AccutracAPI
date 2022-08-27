using DataAccess.Models;
namespace DataAccess.Data
{ 
    public interface IJobAddressInfoData
    {
        Task<JobAddressInfoModel ?> GetJobAddressInfo(string company_code,string id,string custid );
    }
}