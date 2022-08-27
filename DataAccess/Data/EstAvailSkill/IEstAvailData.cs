using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IEstAvailData
    {
        Task PostEstAvail(EstimatorAvailibilityModel avail);

        Task PutEstAvail(EstimatorAvailibilityModel avail);
    }
}