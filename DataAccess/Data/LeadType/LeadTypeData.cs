using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class LeadTypeData : ILeadTypeData 
    {
        private readonly ISqlDataAccess _db;
        public LeadTypeData (ISqlDataAccess db)
        {
            _db = db;   
        }

      

            public Task<IEnumerable<LeadTypeModel>> LeadType(string company_code) =>
           _db.LoadData<LeadTypeModel , dynamic>(storeProcedure: "dbo.spLeadType_GetAll",
                new { company_code = company_code });


    }
}
