using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class LeadbyStatusModel
    {
        public string Company_Code { get; set; }

        public int LeadId { get; set; }

        public int CustomerId { get; set; }

        public int JobAddressId  { get; set; }

        public int? ConfirmLeadType { get; set; }

        public string ReferredBy { get; set; }

        public string Notes { get; set; }

        public int Status { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        public int? LeadSourceId { get; set; }

        public string LeadSourceName { get; set; }

        public string LeadSubSourceName { get; set; }

        public int? LeadSubSourceId { get; set; }

        public string? Customer { get; set; }

        public string? JobAddress { get; set; }
    }
}
