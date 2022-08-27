using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public  class AvailibleSlotsModel
    {
        public DateTime? date { get; set; }
        public string? employee { get; set; }
        public string? userid { get; set; }
        public string? customerid { get; set; }  
        public string? leadId { get; set; }
        public object? startTime { get; set; }
        public object? endTime { get; set; }
        public int taken { get; set; }
    }
}
