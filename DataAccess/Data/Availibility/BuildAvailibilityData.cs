using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data;

public class BuildAvailibilityData : IBuildAvailibilityData 
{
    private readonly ISqlDataAccess _db;
    public BuildAvailibilityData(ISqlDataAccess db)
    {
        _db = db;
    }
    public Task<IEnumerable<AvailibilityModel >> GetAvailibilities (string userName) =>
      _db.BuildAvailibility<AvailibilityModel, dynamic>(sql: "", userName);


}
