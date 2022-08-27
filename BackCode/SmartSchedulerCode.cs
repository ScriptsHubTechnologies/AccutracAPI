using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using Newtonsoft.Json.Linq;

namespace BackCode
{
    public class SmartSchedulerCode
    {
        string cnStr = string.Empty;
        string cnStr2 = string.Empty;
        string connectionId = "Default";
        private readonly IConfiguration _config;
        int _LeadType = 0;
        int _ZoneId = 0;

        public SmartSchedulerCode()
        {
            //_config = ;
            cnStr = "Data Source=accutrac.net;Initial Catalog=Helitrack_Production_5;User ID=sa;Password=P@ssw0rd";
            cnStr2 = "Data Source=accutrac.net;Initial Catalog=Helitrack_TempTables;User ID=sa;Password=P@ssw0rd";
        }

    public async Task startBuild (string userName,int geoZone,int leadType, string jobAddress, string company_code)
        {
            _LeadType = leadType ;
          _ZoneId = geoZone ;
            string _tableName = userName;
            string _company_code = company_code;

            createtable(_tableName);
            Estimators(_tableName,_company_code); // then goes to AvailSlots(_tableName, dt,_company_code);

            await smartCalendar(_tableName,jobAddress); // then goes to  DrivingDistance(dt ,TableName,jobAddress);

        }

        private void Estimators(string _tableName, string _company_code)
        {



            string strSql = "SELECT UserId FROM EstimatorGeoZones WHERE(GeoZoneId = @GeoZoneId and company_code =@company_code)";

            SqlDataAdapter da;
           DataTable dt;
            using (var cn = new SqlConnection(cnStr))
            {
                try
                {
                    var cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.Connection.Open();
                    cmd.CommandText = strSql;
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@GeoZoneId", _ZoneId);
                    cmd.Parameters.AddWithValue("@company_code", _company_code);
                    dt = new DataTable();
                    da = new SqlDataAdapter(cmd);
                   
                    da.Fill(dt); 
                    cmd.Dispose();
                    Console.WriteLine("estimators done");


                    AvailSlots(_tableName, dt,_company_code);
                }
                 
                catch (Exception ex)
                {
                    Console.WriteLine("Estimators  ", ex.Message);
                }

            }

        }
        
        private string TableName = string.Empty;
        private void createtable(string TableName)
        {
     
            string strsql = string.Empty;

            
            strsql = "IF OBJECT_ID('dbo." + TableName + "' , 'U') IS NOT NULL DROP TABLE dbo." + TableName + " ; create table dbo." + TableName + " ( Date date NOT NULL,	Employee nvarchar(50) NOT NULL,StartTime time(7) NOT NULL,	EndTime time(7) NOT NULL,	userid nvarchar(50) NOT NULL, wkDayNumber nvarchar(50) NOT NULL,wkDayName nvarchar(50) NOT NULL)";
            try
            {
                using (var cn = new SqlConnection(cnStr2))
                {

                    var cmd = new SqlCommand();
                                        cmd.Connection = cn;
                    cmd.Connection.Open();
                    cmd.CommandText = strsql;
                    cmd.CommandType = CommandType.Text;

                    cmd.ExecuteNonQuery();
                }
                Console.WriteLine("createtable done");
            }
            catch (Exception ex)
            {
                Console.WriteLine("createtable  ", ex.Message);
            }
        }
  
        //public void deletetemp(string _tableName)
        //{

        //    string strsql = "drop table " + _tableName + " " ;
        //    using (var cn = new SqlConnection(cnStr2))
        //    {
        //        try
        //        {
        //            var cmd = new SqlCommand();


        //            cmd.Connection = cn;
        //            cmd.Connection.Open();
        //            cmd.CommandText = strsql;
        //            cmd.CommandType = CommandType.Text;
        //            cmd.ExecuteNonQuery();
        //        }

        //        catch (Exception)
        //        {

        //        }
        //    }


        //}
        private void AvailSlots(string _tableName,DataTable  dtEmployee, string _company_code)
        {
            var AvailSlots = new DataTable();
            AvailSlots.Columns.Add("Date", typeof(string));
            AvailSlots.Columns.Add("Employee", typeof(string));
            AvailSlots.Columns.Add("StartTime", typeof(string));
            AvailSlots.Columns.Add("EndTime", typeof(string));
            AvailSlots.Columns.Add("UserId", typeof(string));


            string _date = string.Empty;
            string _Employee = string.Empty;
            string _StartTime;
            string _EndTime;
            string _UserId = string.Empty;
            int _wkDayNumber;
            string _wkDayName = string.Empty;
            string timeslot = string.Empty;
             string _UId = string.Empty;

            DateTime dy;
            DateTime da;
            SqlDataAdapter dap;
            var dt = new DataTable();
            int st = 0;
            int dow = 0;
            // Get Estimators Availibilty looping through Availbitly table by day based on company, skills and GeoZone
            string strsql = "SELECT DISTINCT a.Company_Code, a.UserId, a.Name, a.WkDayNumber, a.WkDayName, a.StartDate, a.StartTime, a.EndTime, a.avilHours, a.StartLocation, EstSkills.SpectrumCode, EstSkills.LeadType, EstSkills.LeadTypeName, EstSkills.AppointmentDuration, CONVERT(int, a.avilHours / EstSkills.AppointmentDuration) AS slots, UserGeoZones.GeoZoneId  FROM (SELECT EstimatorAvailibility.UserId, EstimatorAvailibility.Name, EstimatorAvailibility.WkDayNumber, EstimatorAvailibility.WkDayName, EstimatorAvailibility.StartDate, EstimatorAvailibility.StartTime, EstimatorAvailibility.EndTime, DATEDIFF(HH, EstimatorAvailibility.StartTime, EstimatorAvailibility.EndTime) AS avilHours, EstimatorAvailibility.StartLocation, EstimatorAvailibility.Company_Code FROM EstimatorAvailibility INNER JOIN (SELECT TOP(1) id FROM EstimatorAvailibility AS EstimatorAvailibility_1 WHERE (UserId = @user) AND (WkDayNumber = @wkDayNumber) AND (StartDate <= @d) AND (Company_Code = @company_code) ORDER BY StartDate DESC) AS avail ON EstimatorAvailibility.id = avail.id WHERE (EstimatorAvailibility.IsDeleted = 0)) AS a INNER JOIN EstSkills ON a.UserId = EstSkills.UserId AND a.Company_Code = EstSkills.Company_Code INNER JOIN UserGeoZones ON a.UserId = UserGeoZones.AspNetUserId where EstSkills.LeadType=@LeadType and UserGeoZones.GeoZoneId=@ZoneId";
         
            try
            {
                for (int i = 0; i < dtEmployee.Rows.Count; i++)
                {
                    for (int d = 0; d <= 31; d++)
                    {

                        da = DateTime.Today.AddDays(d + 1);
                        if ((int)da.DayOfWeek >= 1 & (int)da.DayOfWeek <= 5)
                        {
                            using (var cn = new SqlConnection(cnStr))
                            {
                                try
                                {
                                    _UId = dtEmployee.Rows[i]["UserId"].ToString();
                                    var cmd = new SqlCommand();

                                    dt = new DataTable();
                                    cmd.Connection = cn;
                                    cmd.Connection.Open();
                                    cmd.CommandText = strsql;
                                    cmd.CommandType = CommandType.Text;
                                    cmd.Parameters.Clear();
                                    cmd.Parameters.AddWithValue("@company_code", _company_code);
                                    cmd.Parameters.AddWithValue("@LeadType", _LeadType);
                                    cmd.Parameters.AddWithValue("@ZoneId", _ZoneId);
                                    cmd.Parameters.AddWithValue("@d", da);
                                    cmd.Parameters.AddWithValue("@user", _UId);
                                    cmd.Parameters.AddWithValue("@wkDayNumber", (int)((da.AddDays(-1).DayOfWeek)));

                                    dap = new SqlDataAdapter(cmd);
                                    dap.Fill(dt);
                                    cmd.Dispose();
                                }

                                catch (Exception ex)
                                {

                                }
                            }

                            for (int e = 0, loopTo = dt.Rows.Count - 1; e <= loopTo; e++)
                            {

                                if (Convert.ToInt32(dt.Rows[e]["WkDayNumber"]) == (int)((da.AddDays(-1).DayOfWeek)))
                                {

                                    st = Convert.ToInt32(dt.Rows[e]["slots"]) - 1;
                                    for (int s = 0, y = st; s <= y; s++)
                                    {

                                        _date = da.ToShortDateString();
                                        _Employee = dt.Rows[e]["Name"].ToString();
                                        string t = dt.Rows[e]["starttime"].ToString();
                                        _StartTime = (Convert.ToDateTime(t).AddHours(s * 2)).ToShortTimeString();
                                        string et = (Convert.ToDateTime(t).AddHours((s * 2) + 2)).ToShortTimeString();
                                        _EndTime = et;

                                        _UserId = (dt.Rows[e]["UserId"]).ToString();
                                        _wkDayName = dt.Rows[e]["WkDayName"].ToString();

                                        _wkDayNumber = Convert.ToInt32( dt.Rows[e]["WkDayNumber"].ToString());

                                        insertAvail(_tableName, _date, _Employee, _StartTime, _EndTime, _UserId, _wkDayName, _wkDayNumber);
                                    }
                                
                                }

                            }
                      
                        }

                    }

                }
                Console.WriteLine("availslots done");
            }
            catch (Exception ex)
            {
                Console.WriteLine("AvailSlots  ", ex.Message);
            }

        }
        private void insertAvail(string _tableName,string _d, string _e, string _starttime, string _endtime, string _userid,string _wkDayName, int _wkDayNumber)
        {
       
                string strsql = "insert into " + _tableName + " (Date,Employee,StartTime,EndTime,userid,wkDayName,wkDayNumber) values(@_d ,@_e ,@_starttime ,@_endtime,@_userid,@_wkDayName,@_wkDayNumber )";
            using (var cn = new SqlConnection(cnStr2))
            {
                try
                {
                    var cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.Connection.Open();
                    cmd.CommandText = strsql;
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@_d", _d);
                    cmd.Parameters.AddWithValue("@_e", _e);
                    cmd.Parameters.AddWithValue("@_starttime", _starttime);
                    cmd.Parameters.AddWithValue("@_endtime", _endtime);
                    cmd.Parameters.AddWithValue("@_userid", _userid);
                    cmd.Parameters.AddWithValue("@_wkDayName", _wkDayName);
                    cmd.Parameters.AddWithValue("@_wkDayNumber", _wkDayNumber);
                    cmd.ExecuteNonQuery();
                }


                catch (Exception ex)
                {
                    Console.WriteLine("insertAvail  ", ex.Message);
                }
            }
        }
        private async Task smartCalendar(string TableName, string jobAddress)
        {
           
         // Build Datatable From Estimators Available Time Slots inserting Jobaddresses from Slots that are already filled.
            string strsql = string.Empty;

           strsql = @"SELECT a.Company_Code, a.CustomerId, a.LeadId, a.Date, a.Employee, a.userid, a.StartTime, a.EndTime, a.Taken, a.SpectrumEmployeeId,case when Leads.JobAddress is not null then Leads.JobAddress else a.HomeLocation end as Location FROM (SELECT Appointment.Company_Code, Appointment.CustomerId, Appointment.LeadId, t.Date, t.Employee, t.userid, t.StartTime, t.EndTime, CASE WHEN appointment.Date IS NULL THEN 0 ELSE 1 END AS Taken, EstimatorLocations.SpectrumEmployeeId, EstimatorLocations.Address1 + ' ' + EstimatorLocations.City + ', ' + EstimatorLocations.State + ' ' + EstimatorLocations.Zip AS HomeLocation FROM EstimatorLocations INNER JOIN  Helitrack_TempTables.dbo.[" + TableName + "] AS t ON EstimatorLocations.UserId = t.userid LEFT OUTER JOIN Appointment ON t.Date = Appointment.Date AND t.userid = Appointment.AssignedTo AND t.StartTime = Appointment.StartTime AND t.EndTime = Appointment.EndTime ) AS a LEFT OUTER JOIN Leads ON a.Company_Code = Leads.Company_Code AND a.LeadId = Leads.LeadId  order by date,employee,starttime";
            using (var cn = new SqlConnection(cnStr))
            {
                try
                {
                    var cmd = new SqlCommand();
                    SqlDataAdapter da;
                    var dt = new DataTable();
                    cmd.Connection = cn;
                    cmd.Connection.Open();
                    cmd.CommandText = strsql;
                    cmd.CommandType = CommandType.Text;
                    da = new SqlDataAdapter(cmd);
                    cmd.Dispose();
                    da.Fill(dt);
                    Console.WriteLine("smartcalender done");

                    await DrivingDistance(dt ,TableName,jobAddress);
                }



                catch (Exception ex)
                {
                    Console.WriteLine("smartCalendar  ", ex.Message);
                }
            }
        }
        private async Task DrivingDistance (DataTable dt , string _tableName,string jobAddress)
        {
            //Loop through all Slots taken or not Inserting Driving Distance and Milage from this Lead Job Address
            Console.WriteLine("drivingdistance started");

            HttpClient client = new HttpClient();
            string dest = string.Empty;
            string orig = string.Empty;
            string t = string.Empty;
            string d = string.Empty;
            string oldorig =string.Empty;
            string oldd = string.Empty;
            string oldt = string.Empty; 

             _tableName = _tableName + "1";
            for (int i = 0; i <dt.Rows.Count; i++)
            {
                dest = jobAddress; 
                orig = dt.Rows[i]["location"].ToString ();
                if (orig.Length > 0)
                {
                    if (oldorig != orig)
                    {
                        var results = await GetDistance(dest, orig);

                        string jsonstring = results.ToString();

                        dynamic data = JObject.Parse(jsonstring);

                        d = data.rows[0].elements[0].distance.text.ToString();
                        t = data.rows[0].elements[0].duration.text.ToString();
                        oldd = d;
                        oldt = t;
                        oldorig = orig;

                    }
                    else
                    {
                        d = oldd;
                        t= oldt;

                    }
                    InsertAPIResults(_tableName,dt, i, d, t);
                }
            }
            await Task.WhenAll();
            Console.WriteLine("drivingdistance done");
        }
        bool ran = false;
        private void InsertAPIResults (string _table,DataTable _dt, int _rows, string _miles, string _time)
        {
            //Build Temp Table With all Slots taken or not with Driving Distance and Milage from this Lead Job Address
            using (var cn = new SqlConnection(cnStr))
            {
                try
                {
                    if (ran == false)
                    {
                        var cmd = new SqlCommand();
                     
                        cmd.Connection = cn;
                        cmd.Connection.Open();

                        cmd.CommandText = "IF OBJECT_ID('Helitrack_TempTables.dbo." + _table + "' , 'U') IS NOT NULL DROP TABLE Helitrack_TempTables.dbo." + _table + " ; create table Helitrack_TempTables.dbo." + _table + " ( [Company_Code] [nchar](10) , [CustomerId] [nvarchar] (50), [LeadId] [nvarchar] (50) , [Date] [nvarchar] (10) NOT NULL, [Employee] [nvarchar] (50) NOT NULL, [UserId] [nvarchar] (50) NOT NULL, [StartTime] [nvarchar] (15) NOT NULL, [EndTime][nvarchar] (15)NOT NULL, [Taken] [bit] NOT NULL, [Location] [nvarchar] (250) NOT NULL, [DrivingDistance] [nchar] (25) NOT NULL, [DrivingTime] [nchar] (25) NOT NULL)";
                        cmd.CommandType = CommandType.Text;
                        cmd.ExecuteNonQuery();
                        ran = true;
                    }
                    
                }

                catch (Exception ex)
                {
                    Console.WriteLine("smartCalendar  ", ex.Message);
                }
            }

            string strSql = @"insert into Helitrack_TempTables.dbo." + _table+ "(Company_Code, CustomerId, LeadId, Date, Employee, userid, StartTime, EndTime, Taken,location,DrivingDistance,DrivingTime) values (@Company_Code, @CustomerId, @LeadId, @Date, @Employee, @userid, @StartTime, @EndTime, @Taken,@location,@Miles,@Time)";
            string? cc = _dt.Rows[_rows]["Company_Code"].ToString();
            string? cid = _dt.Rows[_rows]["CustomerId"].ToString();
            string? lid = _dt.Rows[_rows]["LeadId"].ToString();
            string? d = _dt.Rows[_rows]["Date"].ToString();
            string? e = _dt.Rows[_rows]["Employee"].ToString();
            string? uid = _dt.Rows[_rows]["userid"].ToString();
            string? stime = _dt.Rows[_rows]["StartTime"].ToString();
            string? etime = _dt.Rows[_rows]["EndTime"].ToString();
            string? taken = _dt.Rows[_rows]["Taken"].ToString();
            string? loc = _dt.Rows[_rows]["location"].ToString();
            d = Convert.ToDateTime(d).ToShortDateString();
           
            if (loc == null)
            {
                loc = "";
            }
            using (var cn = new SqlConnection(cnStr))
            {
                try
                {
                    var cmd = new SqlCommand();
                                       cmd.Connection = cn;
                    cmd.Connection.Open();

                    cmd.CommandText = strSql;
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@Company_Code",cc);
                    cmd.Parameters.AddWithValue("@CustomerId",cid );
                    cmd.Parameters.AddWithValue("@LeadId", lid);
                    cmd.Parameters.AddWithValue("@Date", d);
                    cmd.Parameters.AddWithValue("@Employee",e);
                    cmd.Parameters.AddWithValue("@userid", uid);
                    cmd.Parameters.AddWithValue("@StartTime",stime);
                    cmd.Parameters.AddWithValue("@EndTime", etime);
                    cmd.Parameters.AddWithValue("@Taken", taken);
                    cmd.Parameters.AddWithValue("@location",loc);
                    cmd.Parameters.AddWithValue("@Miles", _miles);
                    cmd.Parameters.AddWithValue("@Time", _time);
                  
                    cmd.ExecuteNonQuery();
                 
                }

                catch (Exception ex)
                {
                    Console.WriteLine("smartCalendar  ", ex.Message);
                }
            }

        }
        private async Task<string> GetDistance(string destination, string origin)
        {
            HttpClient client = new HttpClient();
            string url = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=" + destination + "&units=imperial&origins=" + origin + "&key=AIzaSyBpuCKmPVxoYpa9KzyuRlF11YsNZj4GKQA";

            var results = await client.GetStringAsync(url);
            return results;
        }

    }
}
