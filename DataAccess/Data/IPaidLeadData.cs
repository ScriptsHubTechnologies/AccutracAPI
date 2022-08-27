
using DataAccess.Models;

namespace DataAccess.Data
{
    public interface  IPaidLeadData
    {

        Task<IEnumerable<three_shipModel >> GetPaidLeads();
        
        Task InsertPaidLead(three_shipModel paidleads);
           // Task UpdateCustomer(three_shipModel paidleads);
            //Task<CustomerModel?> GetCustomerId(string createdby, string createdDate);
            //object GetCustomerId(string? createdBy, DateTimeOffset? createdDate);
    }
}


