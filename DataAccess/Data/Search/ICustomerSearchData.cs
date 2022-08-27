using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ICustomerSearchData
    {
        Task<IEnumerable<CustomerSearchModel>> GetCustomerSearches(string id,string cc,string jobaddress,string lastname);
    }

}