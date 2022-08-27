using DataAccess.Models;
namespace DataAccess.Data
{
    public interface ILeadStatusData
    {
        //Task<IEnumerable<LeadTypeModel>> LeadType(string company_code);
        Task<IEnumerable<LeadbyStatusModel>> GetLeadbyStatus(string status,string company_code);
    }
}