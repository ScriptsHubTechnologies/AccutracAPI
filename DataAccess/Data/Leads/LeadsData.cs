using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class LeadsData : ILeadsData
{
    private readonly ISqlDataAccess _db;
    public LeadsData(ISqlDataAccess db)
    {
        _db = db;
    }
    //public Task<IEnumerable<CustomerModel>> GetLead()=>
    //    _db.LoadData<CustomerModel, dynamic>(storeProcedure: "dbo.spCustomers_GetAll", new { });

    public async Task<LeadsModel ?> GetLead(string id,string cc)
    {
        var results = await _db.LoadData < LeadsModel , dynamic>(
            storeProcedure: "dbo.spGetLead",
            new { id = id , company_code =cc});
        return results.FirstOrDefault();
    }

    public Task<int> InsertLead(LeadsModel Lead) =>
        _db.LeadSaveData(storedProcedure: "dbo.spLead_Post", Lead);
    public Task UpdateLead(LeadsModel  Lead) =>
        _db.SaveData(storedProcedure: "dbo.spLead_Update", Lead);



}
