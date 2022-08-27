
using DataAccess.Models;
namespace DataAccess.Data
{
    public interface IUserData
    {
        Task<IEnumerable<UserModel>> GetUsers(string company_code, string userid, string name);
        Task InsertUser(UserModel user);
  
        Task UpdateUser(UserModel user);

    }
}