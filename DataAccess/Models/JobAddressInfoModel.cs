using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class JobAddressInfoModel
    {
        public int JobAddressId { get; set; }

        public int CustomerId { get; set; }

        public string? Company_Code { get; set; }

        public string? JobAddress { get; set; }

     
        public string? JobCity { get; set; }

        public string? JobState { get; set; }

        public string? JobZip { get; set; }

        public int ZoneId { get; set; }

        public string? ZoneName { get; set; }

        public int GeoZoneId { get; set; }

        public string? GeoZoneName { get; set; }
             

      

        public string? CompanyName { get; set; }



        public string? Customer { get; set; }


        public string? MailingAddress { get; set; }

      

        public string? MailingCity { get; set; }

        public string? MailingState { get; set; }

        public int? MailingZip { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public int? PhoneType { get; set; }

     
        public string? Notes { get; set; }

        
    }
}
