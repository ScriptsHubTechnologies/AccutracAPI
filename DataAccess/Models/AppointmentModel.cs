using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class AppointmentModel
    {
        public string Company_Code { get; set; }

        public int AppointmentId { get; set; }

        public int CustomerId { get; set; }

        public int LeadId { get; set; }

        public int AppointmentType { get; set; }

        public string AppointmentTypeName { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        //public bool IsApproved { get; set; }

        public int Status { get; set; }

        public string StatusName { get; set; }

        public string AssignedTo { get; set; }

        public string AssignedName { get; set; }

        public string? Date { get; set; }

        public string? StartTime { get; set; }

        public string? EndTime { get; set; }

        public string? DeleteReason { get; set; }

        

        public DateTimeOffset? UpdatedDate { get; set; }

        public string? UpdatedBy { get; set; }
public bool? IsDeleted { get; set; }
    }
}
