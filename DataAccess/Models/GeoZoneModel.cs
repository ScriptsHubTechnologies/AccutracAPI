using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class GeoZoneModel
    {
        public string? ZipCode { get; set; }
        public int ZoneId { get; set; }
        public string? ZoneName { get; set; }
        public int GeoZoneId { get; set; }
        public string? GeoZoneName   { get; set; }

    }
}
