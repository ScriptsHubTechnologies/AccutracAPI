using DataAccess.Models;

namespace DataAccess.Data.Attachment
{
    public interface IAttachmentData
    {
        Task<int> InsertAttachments(AttachmentModel attachment);
        Task<List<AttachmentModel>> GetAttachementByCompany(string company_code, string id, string custid);
        Task<AttachmentModel> GetAttachementById(string attachmentId);
    }
}
