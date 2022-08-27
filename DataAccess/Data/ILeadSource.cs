using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ILeadSource
    {
        Task<IEnumerable<LeadSourcesModel>> GetLeadSources();
    }
}
