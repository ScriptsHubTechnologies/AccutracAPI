using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class CustomersData : ICustomersData
{
    private readonly ISqlDataAccess _db;
    public CustomersData(ISqlDataAccess db)
    {
        _db = db;
    }
    public Task<IEnumerable<CustomerModel>> GetCustomers()=>
        _db.LoadData<CustomerModel, dynamic>(storeProcedure: "dbo.spCustomers_GetAll", new { });

    public async Task<CustomerModel?> GetCustomerId(string Custid)
    {
        var results = await _db.LoadData < CustomerModel, dynamic>(
            storeProcedure: "dbo.spCustomers_GetId",
            new { custid = Custid });
        return results.FirstOrDefault();
    }

    //public Task InsertCustomer(CustomerModel customer) =>
    //    _db.SaveData(storedProcedure: "dbo.spCustomers_Post", new {customer.Company_Code, customer.Customerid ,customer.CustomerType,customer.CompanyName, customer.FirstName, customer.LastName,
    //        customer.MailingAddress, customer.MailingAddress2, customer.MailingCity, customer.MailingState, customer.MailingZip, customer.Email, customer.Phone, 
    //        customer.PhoneType, customer.CreatedBy, customer.CreatedDate, customer.UpdatedBy, customer.UpdatedDate, customer.Notes, customer.UserDefinedstr1, 
    //        customer.UserDefinedint1, customer.UserDefinedstr2, customer.UserDefinedInt2, customer.UserDefinedstr3, customer.Userdefinedint3 });

    public Task<int> CustomerSaveData(CustomerModel customer) =>
       _db.CustomerSaveData(storedProcedure: "dbo.spCustomers_Post", customer);

    //public Task<int> _InsertCustomer(CustomerModel customer) =>
    //     _db. _SaveData(storedProcedure: "dbo.spCustomers_Post", new
    //     {
    //         customer.Company_Code,
    //         customer.Customerid,
    //         customer.CustomerType,
    //         customer.CompanyName,
    //         customer.FirstName,
    //         customer.LastName,
    //         customer.MailingAddress,
    //         customer.MailingAddress2,
    //         customer.MailingCity,
    //         customer.MailingState,
    //         customer.MailingZip,
    //         customer.Email,
    //         customer.Phone,
    //         customer.PhoneType,
    //         customer.CreatedBy,
    //         customer.CreatedDate,
    //         customer.UpdatedBy,
    //         customer.UpdatedDate,
    //         customer.Notes,
    //         customer.UserDefinedstr1,
    //         customer.UserDefinedint1,
    //         customer.UserDefinedstr2,
    //         customer.UserDefinedInt2,
    //         customer.UserDefinedstr3,
    //         customer.Userdefinedint3
    //     });

    public Task UpdateCustomer(CustomerModel customer) =>
        _db.SaveData(storedProcedure: "dbo.spCustomer_Update", customer);



}
