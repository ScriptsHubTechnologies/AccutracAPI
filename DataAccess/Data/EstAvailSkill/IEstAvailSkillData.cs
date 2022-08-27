using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IEstAvailSkillData
    {
        Task<IEnumerable<EstAvailSkillModel>> GetEstAvailSkill(string company_code, string userid);
    }
}