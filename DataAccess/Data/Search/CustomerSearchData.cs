using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class CustomerSearchData : ICustomerSearchData
    {
        private readonly ISqlDataAccess _db;
        public CustomerSearchData(ISqlDataAccess db)
        {
            _db = db;
        }
        public async Task<IEnumerable<CustomerSearchModel >> GetCustomerSearches(string id, string cc, string jobaddress, string lastname)
        {
            var results = await _db.LoadData<CustomerSearchModel, dynamic>(
                storeProcedure: "dbo.spCustomers_Get",
                new { Id = id,CC=cc,JobAddress=jobaddress,LastName=lastname });
            return results;
        }

    }

  
}
