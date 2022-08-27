using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
 
    public class JobAddressModel
    {
        public int JobAddressId { get; set; }

        public int CustomerId { get; set; }

        public string? Company_Code { get; set; }

        public string? JobAddress1 { get; set; }

        public string? JobAddress2 { get; set; }

        public string? JobCity { get; set; }

        public string? JobState { get; set; }

        public string? JobZip { get; set; }

        public int ZoneId { get; set; }

        public string? ZoneName { get; set; }

        public int GeoZoneId { get; set; }

        public string? GeoZoneName { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string? CreatedBy { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

    }
}
