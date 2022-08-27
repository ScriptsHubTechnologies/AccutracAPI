using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class LeadStatusData : ILeadStatusData
    {
        private readonly ISqlDataAccess _db;
        public LeadStatusData(ISqlDataAccess db)
        {
            _db = db;
        }
        public Task<IEnumerable<LeadbyStatusModel>> GetLeadbyStatus(string status, string company_code) =>
            _db.LoadData<LeadbyStatusModel, dynamic>(storeProcedure: "dbo.spLeads_GetStatus", new { status, company_code });

    }
}
