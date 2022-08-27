
using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ILeadSubSource
    {
        Task<IEnumerable <LeadsubSourcesModel?>> GetLeadSubSource (string id);
    }
}
