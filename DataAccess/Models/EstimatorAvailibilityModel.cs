using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class EstimatorAvailibilityModel
    {
        public int id { get; set; }

        public string Company_Code { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public int WkDayNumber { get; set; }

        public string WkDayName { get; set; }

        public DateTime StartDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public string StartLocation { get; set; }

        public bool IsDeleted { get; set; }

        public string Createdby { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
