using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data 
{
    public class LeadSubSourcesData : ILeadSubSource
    {
        private readonly ISqlDataAccess _db;
        public LeadSubSourcesData (ISqlDataAccess db)
        {
            _db = db;
        }
        public async Task<IEnumerable <LeadsubSourcesModel ?>> GetLeadSubSource(string id)
        {
            var results = await _db.LoadData<LeadsubSourcesModel, dynamic>(
                storeProcedure: "dbo.spGetLeadSubSource",
                new { Id = id });
            return results;
        }
    }
}
