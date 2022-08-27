using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class EmployeeModel : IEquatable<EmployeeModel>
    {
        public DateTime? date { get; set; }
        public string ?name { get; set; }
        public string ?userid { get; set; }
        public List<AvailibilityModel> ?slots { get; set; } 
        
        public bool Equals(EmployeeModel other)
        {
            return this.date == other.date &&
                    this.name == other.name &&
                    this.userid == other.userid;
        }
    }
}
