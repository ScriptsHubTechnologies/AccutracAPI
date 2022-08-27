using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class JobAddressInfoData: IJobAddressInfoData
    {
        private readonly ISqlDataAccess _db;
        public JobAddressInfoData(ISqlDataAccess db)
        {
            _db = db;
        }
        public async Task<JobAddressInfoModel?> GetJobAddressInfo(string company_code,string id,string custid )
        {
            var results = await _db.LoadData<JobAddressInfoModel, dynamic>(
                storeProcedure: "spGet_JobAddressInfo",
                new { jobaddressid = id,custid=custid, company_code = company_code });
            return results.FirstOrDefault();
        }
    }
}
