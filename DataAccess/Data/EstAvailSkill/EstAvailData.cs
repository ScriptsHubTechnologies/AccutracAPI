using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class EstAvailData : IEstAvailData
    {
        private readonly ISqlDataAccess _db;
        public EstAvailData(ISqlDataAccess db)
        {
            _db = db;
        }
        public Task PostEstAvail(EstimatorAvailibilityModel avail) =>
   _db.SaveData(storedProcedure: "dbo.spEstAvail_Insert", avail);
        public Task PutEstAvail(EstimatorAvailibilityModel avail) =>
         _db.SaveData(storedProcedure: "dbo.spEstAvail_Update", avail);

    }
}
