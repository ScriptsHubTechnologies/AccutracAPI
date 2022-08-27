using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using DataAccess.Models;

namespace DataAccess.DbAccess
{
    public class BuildScheduleTables : IBuildScheduleTables
    {
        private readonly IConfiguration _config;

        public BuildScheduleTables (IConfiguration config)
        {
            _config = config;

        }

       

        public async Task<IEnumerable<T>> TestData<T, U>(
    string storeProcedure,
    U parameters,
    string connectionId = "Default")
        {
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

            return await connection.QueryAsync<T>(storeProcedure,
                parameters,
                commandType: CommandType.StoredProcedure);

        }
    }
}
