using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class SalesCalendarModel
    {

        public int AppointmentId { get; set; }

        public int CustomerId { get; set; }

        public int jobaddressid { get; set; }

        public string AppointmentTypeName { get; set; }

        public string AssignedTo { get; set; }

        public string Date { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public string CustomerName { get; set; }

        public string JobAddress { get; set; }

        public string LeadTypeName { get; set; }

    }
}

