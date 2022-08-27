using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public  class AvailibilityArrayModel 
    {
        public DateTime? date { get; set; }
        public List<EmployeeModel>? employees { get; set; }

        public bool DateExists(DateTime other)
        {
            return this.date == other;
        }
    }
}
