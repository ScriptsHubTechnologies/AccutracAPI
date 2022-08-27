using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class EstSkillData: IEstSkillData
    {
        private readonly ISqlDataAccess _db;
        public EstSkillData(ISqlDataAccess db)
        {
            _db = db;
        }

 
        public Task PostEstSkill(EstSkillsModel skill) =>
   _db.SaveData(storedProcedure: "dbo.spEstSkills_Insert", skill);
        public Task PutEstSkill(EstSkillsModel skill) =>
         _db.SaveData(storedProcedure: "dbo.spEstSkills_Update", skill);
    }
}
