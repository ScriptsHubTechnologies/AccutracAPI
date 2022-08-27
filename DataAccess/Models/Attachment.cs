namespace DataAccess.Models
{
    public class Attachment
    {
        public string? Company_Code { get; set; }

        public int AttachmentId { get; set; }

        public int CustomerId { get; set; }

        public int JobAddressId { get; set; }

        public string? FunctionTable { get; set; }

        public int? FunctionId { get; set; }

        public string? AttachmentType { get; set; }

        public string? AttachmentName { get; set; }

        public string? AttachmentBase64String { get; set; }

        public string? AttachmentPath { get; set; }
    }
}
