using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
namespace DataAccess.Data
{
    public interface  ILeadCountsData
    {
        Task<LeadCountsModel?> LeadCounts(string company_code);
    }
}
