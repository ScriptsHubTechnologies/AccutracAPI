
using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IAppointmentData
    {
        Task<AppointmentModel?> GetAppointment(string company_code, string leadid, string customerid);
        Task<int> InsertAppointment(AppointmentModel appointment);
        Task UpdateAppointment(AppointmentModel appointment);
    

    }
    //public interface IAppointmentData
    //{
    //    Task<AppointmentModel?> GetAppointment(string cc, string leadid, string customerid);
    //      Task<int> InsertAppointment(AppointmentModel appointment );
    //    Task UpdateAppointment(AppointmentModel appointment);
    //}
}
