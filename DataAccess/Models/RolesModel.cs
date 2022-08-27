using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class RolesModel
    {
    
            public string Company_Code { get; set; }

            public string RolesId { get; set; }

            public string Name { get; set; }

            public bool IsPrimary { get; set; }

            public bool IsDeleted { get; set; }

      

    }
}
