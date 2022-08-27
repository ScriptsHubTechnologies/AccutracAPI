using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;


public class AppointmentData: IAppointmentData  
{
    private readonly ISqlDataAccess _db;
    public AppointmentData(ISqlDataAccess db)
    {
        _db = db;
    }


    public async Task<AppointmentModel?> GetAppointment(string company_code, string leadid, string customerid)
    {
        var results = await _db.LoadData<AppointmentModel, dynamic>(
            storeProcedure: "dbo.spGetAppointment",
            new { company_code = company_code, leadid = leadid, customerid=customerid });
        return results.FirstOrDefault();
    }
    public Task<int> InsertAppointment(AppointmentModel  appointment) =>
    _db.AppointmentSaveData(storedProcedure: "dbo.spAppointment_Post", appointment);


    public Task UpdateAppointment(AppointmentModel appointment) =>
        _db.SaveData(storedProcedure: "dbo.spAppointment_Update", appointment);

}
