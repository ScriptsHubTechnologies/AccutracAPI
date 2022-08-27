using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class EstAvailSkillData : IEstAvailSkillData
    {
        private readonly ISqlDataAccess _db;
        public EstAvailSkillData(ISqlDataAccess db)
        {
            _db = db;
        }

        public Task<IEnumerable<EstAvailSkillModel>> GetEstAvailSkill(string company_code, string userid) => _db.LoadData<EstAvailSkillModel, dynamic>(storeProcedure: "dbo.spEstAvailSkillData", new { company_code = company_code, userid = userid });

    }
}
