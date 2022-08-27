using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class UserModel
    {
        public string? Company_Code { get; set; }

        public string? UserId { get; set; }

        public string? EmployeeId { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Name { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive { get; set; }
    }
}
