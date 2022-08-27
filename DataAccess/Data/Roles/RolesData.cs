using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class RolesData : IRolesData
    {
        private readonly ISqlDataAccess _db;
        public RolesData(ISqlDataAccess db)
        {
            _db = db;
        }

        public Task<IEnumerable<RolesModel >> GetRoles(string company_code, string desc) =>
    _db.LoadData<RolesModel , dynamic>(storeProcedure: "dbo.spGetRoles", new { company_code = company_code, desc = desc });
        public Task InsertRoles(RolesModel roles) =>
   _db.SaveData(storedProcedure: "dbo.spRoles_Insert", roles);
        public Task UpdateRoles(RolesModel roles) =>
         _db.SaveData(storedProcedure: "dbo.spRoles_Update", roles);
    }
}
