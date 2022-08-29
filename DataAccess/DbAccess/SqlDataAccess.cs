using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using DataAccess.Models;

namespace DataAccess.DbAccess;

public class SqlDataAccess : ISqlDataAccess
{
    private readonly IConfiguration _config;

    public SqlDataAccess(IConfiguration config)
    {
        _config = config;

    }

    public async Task<IEnumerable<T>> LoadData<T, U>(
        string storeProcedure,
        U parameters,
        string connectionId = "Default")
    {
        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

        return await connection.QueryAsync<T>(storeProcedure,
            parameters,
            commandType: CommandType.StoredProcedure);

    }

    public async Task<IEnumerable<T>> GetData<T, U>(
    string sql,
    U parameters,
    string connectionId = "Default")
    {
        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

        return await connection.QueryAsync<T>(sql,
            parameters,
            commandType: CommandType.Text);

    }


    public async Task SaveData<T>(
        string storedProcedure,
        T parameters,
        string connectionId = "Default")
    {
        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
    }


    #region InsertCustomer return Id
    public async Task<int> CustomerSaveData(
    string storedProcedure,
    CustomerModel parameters,
    string connectionId = "Default")

    {

        string sql = @"	insert into dbo.customers (Company_Code, CustomerType, CompanyName,FirstName, LastName, MailingAddress, MailingAddress2, MailingCity, MailingState, MailingZip, Email, Phone, PhoneType, CreatedBy,
                    CreatedDate, UpdatedBy,UpdatedDate, Notes, UserDefinedstr1, UserDefinedint1, UserDefinedstr2, UserDefinedInt2, UserDefinedstr3, Userdefinedint3) values (@Company_Code,
	                @CustomerType,@companyName,@FirstName,@LastName,@MailingAddress,@MailingAddress2,@MailingCity,@MailingState,@MailingZip,@Email,@Phone,@PhoneType,
	                @CreatedBy,@CreatedDate,@UpdatedBy,@UpdatedDate,@Notes,@UserDefinedstr1,@UserDefinedint1,@UserDefinedstr2,@UserDefinedInt2,
	                @UserDefinedstr3,@Userdefinedint3);

		Select @id= @@IDENTITY;";

        var P = new DynamicParameters();
        P.Add("@id", 0, DbType.Int32, ParameterDirection.Output);
        P.Add("@Company_Code", parameters.Company_Code, DbType.String);
        P.Add("@CustomerType", parameters.CustomerType, DbType.Int32);
        P.Add("@CompanyName", parameters.CompanyName, DbType.String);
        P.Add("@FirstName", parameters.FirstName, DbType.String);
        P.Add("@LastName", parameters.LastName, DbType.String);
        P.Add("@MailingAddress", parameters.MailingAddress, DbType.String);
        P.Add("@MailingAddress2", parameters.MailingAddress2, DbType.String);
        P.Add("@MailingCity", parameters.MailingCity, DbType.String);
        P.Add("@MailingState", parameters.MailingState, DbType.String);
        P.Add("@MailingZip", parameters.MailingZip, DbType.String);
        P.Add("@Email", parameters.Email, DbType.String);
        P.Add("@Phone", parameters.Phone, DbType.String);
        P.Add("@PhoneType", parameters.PhoneType, DbType.Int32);
        P.Add("@CreatedBy", parameters.CreatedBy, DbType.String);
        P.Add("@CreatedDate", DateTimeOffset.Now, DbType.DateTimeOffset);
        P.Add("@UpdatedBy", null, DbType.String);
        P.Add("@UpdatedDate", null, DbType.DateTimeOffset);
        P.Add("@Notes", parameters.Notes, DbType.String);
        P.Add("@UserDefinedstr1", parameters.UserDefinedstr1, DbType.String);
        P.Add("@UserDefinedint1", parameters.UserDefinedint1, DbType.Int32);
        P.Add("@UserDefinedstr2", parameters.UserDefinedstr2, DbType.String);
        P.Add("@UserDefinedInt2", parameters.UserDefinedInt2, DbType.Int32);
        P.Add("@UserDefinedstr3", parameters.UserDefinedstr3, DbType.String);
        P.Add("@Userdefinedint3", parameters.Userdefinedint3, DbType.Int32);

        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(sql, P, commandType: CommandType.Text);
        if (P.Get<int>("@id") != 0)
        {
            int id = P.Get<int>("@id");
            return (id);
        }
        else
        {
            return (0);
        }
    }
    #endregion
    #region InsertLead retrun Id
    public async Task<int> LeadSaveData(string storedProcedure, LeadsModel p, string connectionId = "Default")
    {
        string sql = @"INSERT INTO Leads
                         (Company_Code, CustomerId,JobAddressId, ConfirmLeadType, ReferredBy, Notes, Status, CreatedDate, CreatedBy,  IsDeleted, LeadSourceId, LeadSourceName, 
                         LeadSubSourceName, LeadSubSourceId)
VALUES        (@Company_Code, @CustomerId,@JobAddressId, @ConfirmLeadType, @ReferredBy, @Notes, @Status, @CreatedDate, @CreatedBy,  @IsDeleted, @LeadSourceId, @LeadSourceName,
                         @LeadSubSourceName, @LeadSubSourceId);
                            Select @id= @@IDENTITY;";
        DateTimeOffset d = DateTimeOffset.Now;
        var P = new DynamicParameters();
        P.Add("@id", 0, DbType.Int32, ParameterDirection.Output);
        P.Add("@Company_Code", p.Company_Code, DbType.String);
        P.Add("@CustomerId", p.CustomerId, DbType.Int32);
        P.Add("@JobAddressId", p.JobAddressId, DbType.Int32);
        P.Add("@ConfirmLeadType", p.ConfirmLeadType, DbType.Int32);
        P.Add("@ReferredBy", p.ReferredBy, DbType.String);
        P.Add("@Notes", p.Notes, DbType.String);
        P.Add("@Status", p.Status, DbType.String);
        P.Add("@CreatedDate", d, DbType.DateTimeOffset);
        P.Add("@CreatedBy", p.CreatedBy, DbType.String);
        P.Add("@IsDeleted", 0, DbType.Int32);
        P.Add("@LeadSourceId", p.LeadSourceId, DbType.Int32);
        P.Add("@LeadSourceName", p.LeadSourceName, DbType.String);
        P.Add("@LeadSubSourceName", p.LeadSubSourceName, DbType.String);
        P.Add("@LeadSubSourceId", p.LeadSubSourceId, DbType.Int32);
        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(sql, P, commandType: CommandType.Text);
        if (P.Get<int>("@id") != 0)
        {
            int id = P.Get<int>("@id");
            return (id);
        }
        else
        {
            return (0);
        }
    }


    #endregion
    #region InsertJobAddress return Id
    public async Task<int> JobAddressSaveData(
   string storedProcedure,
   JobAddressModel p,
   string connectionId = "Default")
    {


        string sql = @"INSERT INTO JobAddress
                         (CustomerId, Company_Code, JobAddress1, JobAddress2, JobCity, JobState, JobZip, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy, GeoZoneId, GeoZoneName, ZoneId, ZoneName)
              VALUES
                        (@CustomerId, @Company_Code, @Address1, @Address2, @City, @State, @Zip, @CreatedDate, @CreatedBy, @UpdatedDate, @UpdatedBy, @GeoZoneId, @GeoZoneName, @ZoneId, @ZoneName)

                        Select @id= @@IDENTITY;";
        DateTimeOffset d = DateTimeOffset.Now;
        var P = new DynamicParameters();
        P.Add("@id", 0, DbType.Int32, ParameterDirection.Output);
        P.Add("@Company_Code", p.Company_Code, DbType.String);
        P.Add("@CustomerId", p.CustomerId, DbType.Int32);
        P.Add("@Address1", p.JobAddress1, DbType.String);
        P.Add("@Address2", p.JobAddress2, DbType.String);
        P.Add("@City", p.JobCity, DbType.String);
        P.Add("@State", p.JobState, DbType.String);
        P.Add("@Zip", p.JobZip, DbType.String);
        P.Add("@CreatedDate", d, DbType.DateTimeOffset);
        P.Add("@CreatedBy", p.CreatedBy, DbType.String);
        P.Add("@UpDatedDate", d, DbType.DateTimeOffset);
        P.Add("@UpdatedBy", p.UpdatedBy, DbType.String);
        P.Add("@GeoZoneId", p.GeoZoneId, DbType.Int32);
        P.Add("@GeoZoneName", p.GeoZoneName, DbType.String);
        P.Add("@ZoneId", p.ZoneId, DbType.Int32);
        P.Add("@ZoneName", p.ZoneName, DbType.String);


        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(sql, P, commandType: CommandType.Text);
        if (P.Get<int>("@id") != 0)
        {
            int id = P.Get<int>("@id");
            return (id);
        }
        else
        {
            return (0);
        }

    }

    public async Task<int> InsertAttachment(string storedProcedure, AttachmentModel p, string connectionId = "Default")
    {
        string sql = @"INSERT INTO Attachments
                         ([Company_Code], [CustomerId], [JobAddressId], [FunctionTable], [FunctionId], [AttachmentType], [AttachmentName], [AttachmentPath])
              VALUES
                        (@Company_Code, @CustomerId, @JobAddressId, @FunctionTable, @FunctionId, @AttachmentType, @AttachmentName, @AttachmentPath)

                        Select @id = @@IDENTITY;";
        var P = new DynamicParameters();
        P.Add("@id", 0, DbType.Int32, ParameterDirection.Output);
        P.Add("@Company_Code", p.Company_Code, DbType.String);
        P.Add("@CustomerId", p.CustomerId, DbType.Int32);
        P.Add("@JobAddressId", p.JobAddressId, DbType.Int32);
        P.Add("@FunctionTable", p.FunctionTable, DbType.String);
        P.Add("@FunctionId", p.FunctionId, DbType.Int32);
        P.Add("@AttachmentType", p.AttachmentType, DbType.String);
        P.Add("@AttachmentName", p.AttachmentName, DbType.String);
        P.Add("@AttachmentPath", p.AttachmentPath, DbType.String);


        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(sql, P, commandType: CommandType.Text);
        if (P.Get<int>("@id") != 0)
        {
            int id = P.Get<int>("@id");
            return (id);
        }
        else
        {
            return (0);
        }

    }

    #endregion
    #region InsertAppointment return Id
    public async Task<int> AppointmentSaveData(string storedProcedure, AppointmentModel p, string connectionId = "Default")
    {
        string sql = @"INSERT INTO Appointment
                         (Company_Code,  CustomerId, LeadId, AppointmentType, AppointmentTypeName, Status, StatusName, CreatedDate, CreatedBy, AssignedTo, AssignedName, Date, StartTime, EndTime, DeleteReason, 
                         UpdatedDate, UpdatedBy, IsDeleted)
                      VALUES 
                         (@Company_Code, @CustomerId, @LeadId, @AppointmentType, @AppointmentTypeName, @Status, @StatusName, @CreatedDate, @CreatedBy, @AssignedTo, @AssignedName, @Date, @StartTime, @EndTime, @DeleteReason, @UpdatedDate, @UpdatedBy, @IsDeleted);
                      Select @id= @@IDENTITY;";
        DateTimeOffset d = DateTimeOffset.Now;
        var P = new DynamicParameters();
        P.Add("@id", 0, DbType.Int32, ParameterDirection.Output);
        P.Add("@Company_Code", p.Company_Code, DbType.String);
        P.Add("@CustomerId", p.CustomerId, DbType.Int32);
        P.Add("@LeadId", p.LeadId, DbType.Int32);
        P.Add("@AppointmentType", p.AppointmentType, DbType.Int32);
        P.Add("@AppointmentTypeName", p.AppointmentTypeName, DbType.String);
        P.Add("@CreatedDate", d, DbType.DateTimeOffset);
        P.Add("@CreatedBy", p.CreatedBy, DbType.String);
        P.Add("@Status", p.Status, DbType.Int32);
        P.Add("@StatusName", p.StatusName, DbType.String);
        P.Add("@AssignedTo", p.AssignedTo, DbType.String);
        P.Add("@AssignedName", p.AssignedName, DbType.String);
        P.Add("@Date", p.Date, DbType.String);
        P.Add("@StartTime", p.StartTime, DbType.String);
        P.Add("@EndTime", p.EndTime, DbType.String);
        P.Add("@DeleteReason", p.DeleteReason, DbType.String);
        P.Add("@IsDeleted", 0, DbType.Boolean);
        P.Add("@UpdatedDate", d, DbType.DateTimeOffset);
        P.Add("@UpdatedBy", p.UpdatedBy, DbType.String);

        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));
        await connection.ExecuteAsync(sql, P, commandType: CommandType.Text);
        if (P.Get<int>("@id") != 0)
        {
            int id = P.Get<int>("@id");
            return (id);
        }
        else
        {
            return (0);
        }
    }
    #endregion

    #region Build Availibility

    public async Task<IEnumerable<T>> BuildAvailibility<T, U>(
  string sql,
  string userName,

  string connectionId = "Default")
    {
        string _table = userName;
        sql = @"Select * from Helitrack_TempTables.dbo." + _table + "1 order by date,userid,starttime";
        //sql = @"SELECT Company_Code, CustomerId, LeadId, CONVERT(nvarchar(10), Date, 101) as Date, Employee, userid, StartTime, EndTime, Taken FROM (SELECT appointment.Company_Code,
        //          appointment.CustomerId, appointment.LeadId," + _table + ".Date, " + _table + ".Employee, " + _table + ".userid," + _table + " .StartTime, " + _table + ".EndTime," +
        //          " CASE WHEN appointment.Date IS NULL THEN 0 ELSE 1 END AS Taken " + " FROM appointment RIGHT OUTER JOIN " + _table + " ON appointment.Date = " + _table + ".Date AND appointment.AssignedTo = "
        //          + _table + ".userid AND appointment.StartTime = " + _table + ".StartTime AND appointment.EndTime = " + _table + ".EndTime) AS a   order by date , userid,starttime";

        using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

        return await connection.QueryAsync<T>(sql,

            commandType: CommandType.Text);

    }

    #endregion 
}
