using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProjectTypeData
    {
        Task<IEnumerable<ProjectTypeModel>> GetProjectTypes ();
    }
}