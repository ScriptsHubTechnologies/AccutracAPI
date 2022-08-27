using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data
{
    public class GeoZoneData : IGeoZoneData
    {
        private readonly ISqlDataAccess _db;
        public GeoZoneData (ISqlDataAccess db)
        {
            _db = db;
        }

        public async Task<GeoZoneModel?> GetGeoZone(string zipcode)
        {
            var results = await _db.LoadData<GeoZoneModel, dynamic>(
                storeProcedure: "dbo.spGeoZone_Zipcode",
                new { Zipcode = zipcode});
            return results.FirstOrDefault();
        }
        public Task<IEnumerable<AllGeoZoneModel>> GetAllGeoZones(string company_code) =>
_db.LoadData<AllGeoZoneModel, dynamic>(storeProcedure: "dbo.spGetAllGeoZones", new { company_code = company_code });

   
    }
}
