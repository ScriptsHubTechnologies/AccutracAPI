using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class AvailibilityModel 
    {
        public string? Company_Code { get; set; }

        public DateTime date { get; set; }
        //public List<string> Employees { get; set; }
        public string? employee {get;set;}
        public string? customerId { get; set; }
        public string? leadId { get; set; }
        public string? userid { get; set; }
        public object? startTime { get; set; }
        public object? endTime { get; set; }
        public int taken { get; set; }
        public string? location { get; set; }
        public string? DrivingDistance { get; set; }
        public string? DrivingTime { get; set; }    


        


    }
}
