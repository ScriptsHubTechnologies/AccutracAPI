using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IEstSkillData
    {
        Task PostEstSkill(EstSkillsModel  skill);

        Task PutEstSkill(EstSkillsModel skill);
    }
}