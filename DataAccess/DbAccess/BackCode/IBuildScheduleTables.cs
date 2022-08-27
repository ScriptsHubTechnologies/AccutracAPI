using DataAccess.Models;

namespace DataAccess.DbAccess
{
    public interface IBuildScheduleTables
    {
        Task<IEnumerable<T>> TestData<T, U>(string sql, U parameters, string connectionId = "Default");
    }
}
