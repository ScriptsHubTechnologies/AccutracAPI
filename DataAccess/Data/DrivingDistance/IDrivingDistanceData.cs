using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IDrivingDistanceData
    {
        Task<IEnumerable<DrivingDistanceModel >> GetDrivingDistance();
    }
}
