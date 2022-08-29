using DataAccess.Models;
namespace DataAccess.DbAccess
{
    public interface ISqlDataAccess
    {
        
        Task<IEnumerable<T>> LoadData<T, U>(string storeProcedure, U parameters, string connectionId = "Default");
        Task<IEnumerable<T>> GetData<T, U>(string sql, U parameters, string connectionId = "Default");
        Task SaveData<T>(string storedProcedure, T parameters, string connectionId = "Default");

        #region SaveData and Return Id
        Task<int> CustomerSaveData(string storedProcedure, CustomerModel parameters, string connectionId = "Default");
        Task<int> LeadSaveData(string storedProcedure, LeadsModel  parameters, string connectionId = "Default");
        Task<int> AppointmentSaveData(string storedProcedure, AppointmentModel  parameters, string connectionId = "Default");
        Task<int> JobAddressSaveData(string storedProcedure, JobAddressModel  parameters, string connectionId = "Default");
        Task<int> InsertAttachment(string storedProcedure, AttachmentModel parameters, string connectionId = "Default");
        #endregion
        #region Availibility
        Task<IEnumerable<T>> BuildAvailibility<T,U>(string sql,string userName, string connectionId = "Default");
        

        #endregion

    }
}