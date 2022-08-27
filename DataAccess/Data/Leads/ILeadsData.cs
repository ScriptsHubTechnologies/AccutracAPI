using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ILeadsData
    {
           
        Task<LeadsModel ?> GetLead(string id, string cc);
        //Task<IEnumerable<CustomerModel>> GetCustomers();
        Task<int> InsertLead(LeadsModel Lead );
        Task UpdateLead(LeadsModel Lead);
  
    }
}