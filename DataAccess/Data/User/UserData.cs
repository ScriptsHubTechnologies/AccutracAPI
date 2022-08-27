using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class UserData : IUserData
    {
        private readonly ISqlDataAccess _db;
        public UserData(ISqlDataAccess db)
        {
            _db = db;
        }
     
        public Task<IEnumerable<UserModel>> GetUsers(string company_code, string userid, string name) =>
    _db.LoadData<UserModel , dynamic>(storeProcedure: "dbo.spGetUsers", new { company_code = company_code, UserId = userid, Name = name });
        public Task InsertUser(UserModel user) =>
   _db.SaveData(storedProcedure: "dbo.spUser_Insert", user);
    public Task UpdateUser(UserModel user) =>
     _db.SaveData(storedProcedure: "dbo.spUser_UpDate", user);
     
    }


}
