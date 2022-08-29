using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data.Attachment
{
    public class AttachmentData : IAttachmentData
    {
        private readonly ISqlDataAccess _db;
        public AttachmentData(ISqlDataAccess db)
        {
            _db = db;
        }
        public async Task<List<AttachmentModel>> GetAttachementByCompany(string company_code, string id, string custid)
        {
            var results = await _db.LoadData<AttachmentModel, dynamic>(
                    storeProcedure: "dbo.spAttachment_GetByCompany",
                    new { @custid = custid, @jobid = id, @company_code = company_code });
            return results.ToList();
        }

        public async Task<AttachmentModel> GetAttachementById(string attachmentId)
        {
            var results = await _db.LoadData<AttachmentModel, dynamic>(
                    storeProcedure: "dbo.spAttachment_GetById",
                    new { @id = attachmentId });
            return results.FirstOrDefault();
        }

        public Task<int> InsertAttachments(AttachmentModel jobaddress) =>
           _db.InsertAttachment(storedProcedure: "dbo.spJobAddress_Post", jobaddress);
    }
}
