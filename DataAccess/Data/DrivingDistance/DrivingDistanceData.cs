using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class DrivingDistanceData : IDrivingDistanceData
{
    private readonly ISqlDataAccess _db;
    public DrivingDistanceData (ISqlDataAccess db)
    {
        _db = db;
    }
    public Task<IEnumerable<DrivingDistanceModel >> GetDrivingDistance() =>
        _db.LoadData<DrivingDistanceModel, dynamic>(storeProcedure: "dbo.spCustomers_GetAll", new { });

    public Task<IEnumerable<DrivingDistanceModel>> GetDrivingDistances() =>
    _db.GetData<DrivingDistanceModel, dynamic>(sql: "Select * from Customers", new { });

    //public async Task<CustomerModel?> GetCustomerId(string createdby, string createdDate)
    //{
    //    var results = await _db.LoadData<CustomerModel, dynamic>(
    //        storeProcedure: "dbo.spCustomers_GetId",
    //        new { CreatedBy = createdby, CreatedDate = createdDate });
    //    return results.FirstOrDefault();
    //}

    //public Task InsertCustomer(CustomerModel customer) =>
    //    _db.SaveData(storedProcedure: "dbo.spCustomers_Post", new
    //    {
    //        customer.Company_Code,
    //        customer.CustomerType,
    //        customer.FirstName,
    //        customer.LastName,
    //        customer.MailingAddress,
    //        customer.MailingAddress2,
    //        customer.MailingCity,
    //        customer.MailingState,
    //        customer.MailingZip,
    //        customer.Email,
    //        customer.Phone,
    //        customer.PhoneType,
    //        customer.CreatedBy,
    //        customer.CreatedDate,
    //        customer.UpdatedBy,
    //        customer.UpdatedDate,
    //        customer.Notes,
    //        customer.UserDefinedstr1,
    //        customer.UserDefinedint1,
    //        customer.UserDefinedstr2,
    //        customer.UserDefinedInt2,
    //        customer.UserDefinedstr3,
    //        customer.Userdefinedint3
    //    });

    //public Task UpdateCustomer(CustomerModel customer) =>
    //    _db.SaveData(storedProcedure: "dbo.spCustomer_Update", customer);



}