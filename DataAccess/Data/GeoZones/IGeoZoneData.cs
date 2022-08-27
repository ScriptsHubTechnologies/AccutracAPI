
using DataAccess.Models;

namespace DataAccess.Data
{ 
    public interface IGeoZoneData
    {
        Task<GeoZoneModel?> GetGeoZone(string  ZipCode );
        Task<IEnumerable<AllGeoZoneModel>> GetAllGeoZones(string company_code);
    }
}