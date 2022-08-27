using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IRolesData
    {
        Task<IEnumerable<RolesModel >> GetRoles(string company_code, string desc);
       
        //Task<int> InsertRoles(RolesModel  roles);
       
        //Task UpdateRoles(RolesModel  roles);

    }
}