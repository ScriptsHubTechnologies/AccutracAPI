using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class EstSkillsModel
    {
        public string Company_Code { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public string EmployeeCode { get; set; }

        public int LeadType { get; set; }

        public string LeadTypeName { get; set; }

        public decimal AppointmentDuration { get; set; }
    }
}
