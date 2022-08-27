using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class LeadSourcesModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

    }

}
