using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
namespace DataAccess.Data;
    public interface IBuildAvailibilityData
    {
    Task<IEnumerable<AvailibilityModel >> GetAvailibilities (string userName);
}

