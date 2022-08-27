using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class LeadSourceData : ILeadSource

    {

        private readonly ISqlDataAccess _db;
        public LeadSourceData (ISqlDataAccess db)
        {
            _db = db;
        }
        public Task<IEnumerable<LeadSourcesModel>> GetLeadSources() => _db.LoadData<LeadSourcesModel, dynamic>(storeProcedure: "dbo.spLeadSources_GetAll", new { });
       
    }
}
