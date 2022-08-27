using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class LeadCountsModel
    {
       public string? Company_Code { get; set; }
        public int Total { get; set; }
        public int Pending { get; set; }
       public int ApprovedDeadLead { get; set; }
       public int Unscheduled { get; set; }
        public int Reshedule { get; set; }

    }
}
