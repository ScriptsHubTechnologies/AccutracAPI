using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class JobAddressData : IJobAddressData
    {
        private readonly ISqlDataAccess _db;
        public JobAddressData(ISqlDataAccess db)
        {
            _db = db;
        }
        public Task<IEnumerable<JobAddressModel>> GetJobAddresses() =>
            _db.LoadData<JobAddressModel, dynamic>(storeProcedure: "dbo.spJobAddress_GetAll", new { });

        public async Task<JobAddressModel?> GetJobAddress(string id, string company_code)
        {
            var results = await _db.LoadData<JobAddressModel, dynamic>(
                storeProcedure: "dbo.spJobAddress_GetId",
                new { JobAddressId = id, company_code = company_code });
            return results.FirstOrDefault();
        }

        public Task<int> InsertJobAddress(JobAddressModel jobaddress) =>
            _db.JobAddressSaveData(storedProcedure: "dbo.spJobAddress_Post", jobaddress);

        public Task UpdateJobAddress(JobAddressModel jobaddress) =>
            _db.SaveData(storedProcedure: "dbo.spJobAddress_Update", jobaddress);

        public Task<int> InsertAttachments(Attachment attachment)
        {
            return _db.InsertAttachment(storedProcedure: "dbo.spAttachment_Post", attachment);
        }

        public async Task<List<JobAddressModel>> GetAttachementById(string company_code, string id, string custid)
        {
            var results = await _db.LoadData<JobAddressModel, dynamic>(
                    storeProcedure: "dbo.spAttachment_GetById",
                    new { @custid = custid, @jobid = id, @company_code = company_code });
            return results.ToList();
        }

        public Task<JobAddressModel?> GetJobAddress(string id)
        {
            throw new NotImplementedException();
        }
    }
}
