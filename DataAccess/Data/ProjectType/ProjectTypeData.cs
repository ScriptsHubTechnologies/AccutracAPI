using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class ProjectTypeData: IProjectTypeData

    {
        
    private readonly ISqlDataAccess _db;
        public ProjectTypeData(ISqlDataAccess db)
        {
            _db = db;
        }
        public Task<IEnumerable<ProjectTypeModel>> GetProjectTypes() =>
            _db.LoadData<ProjectTypeModel, dynamic>(storeProcedure: "dbo.spProjectType_GetAll", new { });

  
    }
}
