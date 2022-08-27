using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class LeadCountsData : ILeadCountsData
{
    private readonly ISqlDataAccess _db;
    public LeadCountsData (ISqlDataAccess db)
    {
        _db = db;
    }
    public async Task<LeadCountsModel?> LeadCounts(string company_code)
    {
        var results = await _db.LoadData<LeadCountsModel, dynamic>(
            storeProcedure: "dbo.spLeads_GetCount",
            new { Company_Code = company_code });
        return results.FirstOrDefault();
    }
}

