using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ICustomersData
    {
           
        Task<CustomerModel?> GetCustomerId(string custid);
        Task<IEnumerable<CustomerModel>> GetCustomers();
      //  Task InsertCustomer(CustomerModel customer );
        Task<int> CustomerSaveData(CustomerModel customer);
      //  Task<int> _InsertCustomer(CustomerModel customer);
        Task UpdateCustomer(CustomerModel customer);
  
    }
}