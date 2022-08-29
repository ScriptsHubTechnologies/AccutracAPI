

using AccutracMinimalAPI.Attributes;
using Newtonsoft.Json;
using DataAccess.Models;
using BackCode;
using Microsoft.Extensions.Configuration;
using AccutracMinimalAPI;


namespace AccutracMinimalAPI

{
    public static class Api
    {
        public static void ConfigureApi(this WebApplication app)
        {
            //All API endpoint Mapping

            // ********** Administration ***********

            app.MapPost("/Admin/Users/Post", InsertUser);
            app.MapPut("/Admin/Users/Put", UpdateUser);

            // ********************************************
            app.MapGet("/User/Roles/{Company_Code,Desc}", GetRoles);
            app.MapGet("/Users/{Company_Code,UserId,Name}", GetUsers);
            app.MapGet("/Customers", GetCustomers);
            app.MapGet("/Custid/{CustomerId}", GetCustomerId);
            app.MapPut("/Customers", UpdateCustomer);
            app.MapPost("/Customers", CustomerSaveData);
            app.MapGet("/Lead/LeadType/{company_code}", LeadType);
            app.MapGet("/Lead/LeadSource", GetLeadSources);
            app.MapGet("/Lead/ProjectType", GetProjectTypes);
            app.MapGet("/Lead/{id,cc}", GetLead);
            app.MapPost("/Lead", InsertLead);
            app.MapPut("/Lead/{id}", UpdateLead);
            app.MapGet("/Appointment/{company_code,leadid,custoemrid}", GetAppointment);
            app.MapPost("/Appoinment", InsertAppointment);
            app.MapPut("/Appointment/{company_code,customerid,AppointmentId}", UpdateAppointment);
            app.MapGet("/JobAddress/Info/{company_code,jobaddressid,customerid}", GetJobAddressInfo);
            app.MapGet("/JobAddresses", GetJobAddresses);
            app.MapPost("/JobAddress", InsertJobAddress);
            app.MapPut("/JobAddress", UpdateJobAddress);
            app.MapGet("/GeoZones/{zipcode}", GetGeoZones);
            app.MapGet("GeoZones/All", GetAllGeoZones);
            app.MapGet("/Lead/Status/{status,company_code}", GetLeadbyStatus);
            app.MapGet("/Notes/{cc,jobAddressId}", GetAllNotes);
            app.MapGet("Notes/idTypeName/{cc,id,idTypeName}", GetNotesfromType);
            app.MapGet("SalesCalendar/{cc,employeeid,date}", GetSalesCalendar);
            app.MapGet("/EstAvailSkill/{company_code,userid}", GetEstAvailSkill);
            app.MapPost("/EstAvailSkill/Avail/Insert", PostEstAvail);
            app.MapPut("/EstAvailSkill/Avail/Update", PutEstAvail);
            app.MapPost("/EstAvailSkill/Skill/Insert", PostEstSkill);
            app.MapPut("/EstAvailSkill/Skill/Update", PutEstSkill);
            //*************** Counts ***************************
            app.MapGet("/Lead/Counts/{company_code}", LeadCounts);
            //*************** Searches *************************
            app.MapGet("/Lead/LeadSource/SubSource", GetLeadSubSource);
            app.MapGet("/Search/Customer/{id,cc,jobaddress,lastname}", GetSearchCustomer);
            //*************** Smart Scheduler **********************
            app.MapGet("/Search/DrivingDistance/{Destination}", GetDrivingDistance);
            //app.MapGet("/SmartScheduler/", GetAvailibility);
            app.MapGet("ProcessAvailablity/{userName,geoZone,leadType,jobAddress,company_code}", ProcessAvailablity);
            app.MapGet("ResetFilter/{userName}", GetAvailibility);
            //*************** Paid Leads *********************************
            app.MapPost("/Leads/ThreeShip", InsertPaidLead);
            app.MapGet("/Leads/ThreeShip", GetPaidLeads);
            app.MapPost("/Attchment", AttachmentsSaveData);
            app.MapGet("/Attachment/download/{attachmentId}", GetAttachmentByteArray);
            app.MapGet("/Attachment/{company_code,jobaddressid,customerid}", GetAttachementByCompany);
            //app.MapPost("/ChooseFile/{formdata}", SaveChooseFileData);

            app.MapPost("/Files/uploadFiles/{company_code,jobaddressid,customerid}", (HttpRequest request, string cc, string id, string custid, IJobAddressData data) =>
            {
                //request.ContentType = "multipart/form-data";
                if (!request.Form.Files.Any())
                    return Results.BadRequest("At list select one file");

                DateTime now = DateTime.Now;

                string date = now.Date.ToString();
                string day = now.Day.ToString();
                string year1 = now.DayOfYear.ToString();
                string year = now.Year.ToString();
                string hr = now.Hour.ToString();
                string min = now.Minute.ToString();
                string sec = now.Second.ToString();
                string month = now.Month.ToString();
                string todaysDate = year + "" + month + "" + day + "" + hr + "" + min + "" + sec;

                var Name = custid + "_" + id + "_" + todaysDate + ".png";

                //var file = request.Form.Files[0];

                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Assets\Images\"); //Path


                //var stream = new FileStream(filePath + file.FileName, FileMode.Create);

                //file.CopyTo(stream);

                foreach (var file in request.Form.Files)
                {
                    using (var stream = new FileStream(filePath + file.FileName, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        var imagePath = "Assets/Images/";

                        Attachment attachment = new Attachment();

                        attachment.Company_Code = cc;
                        attachment.CustomerId = int.Parse(custid);
                        attachment.JobAddressId = int.Parse(id);
                        attachment.AttachmentName = file.FileName;
                        attachment.AttachmentType = file.ContentType;
                        attachment.AttachmentPath = imagePath + file.FileName;

                        var results = data.InsertAttachments(attachment);
                    }
                }

                return Results.Ok(new { data = "Ok" });
            });
            //********************************************************

        }


        #region Administration
        private static async Task<IResult> InsertUser(UserModel user, IUserData data)
        {
            try
            {
                await data.InsertUser(user);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }


        private static async Task<IResult> UpdateUser(UserModel user, IUserData data)
        {
            try
            {
                await data.UpdateUser(user);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> InsertEstInfo(UserModel user, IUserData data)
        {
            try
            {
                await data.InsertUser(user);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }


        private static async Task<IResult> UpdateEstInfo(UserModel user, IUserData data)
        {
            try
            {
                await data.UpdateUser(user);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion
        #region Users
        private static async Task<IResult> GetUsers(string company_code, string userid, string name, IUserData data)
        {
            try
            {
                var results = await data.GetUsers(company_code, userid, name);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetRoles(string company_code, string desc, IRolesData data)
        {
            try
            {
                var results = await data.GetRoles(company_code, desc);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> GetAllGeoZones(string company_code, IGeoZoneData data)
        {
            try
            {
                var results = await data.GetAllGeoZones(company_code);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }


        #endregion
        #region Estimators
        private static async Task<IResult> GetEstAvailSkill(string company_code, string userid, IEstAvailSkillData data)
        {
            try
            {
                var results = await data.GetEstAvailSkill(company_code, userid);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> PostEstSkill(EstSkillsModel skill, IEstSkillData data)
        {
            try
            {
                await data.PostEstSkill(skill);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }


        private static async Task<IResult> PutEstSkill(EstSkillsModel skill, IEstSkillData data)
        {
            try
            {
                await data.PutEstSkill(skill);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> PostEstAvail(EstimatorAvailibilityModel avail, IEstAvailData data)
        {
            try
            {
                await data.PostEstAvail(avail);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }


        private static async Task<IResult> PutEstAvail(EstimatorAvailibilityModel avail, IEstAvailData data)
        {
            try
            {
                await data.PutEstAvail(avail);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }



        #endregion 

        #region Customer
        private static async Task<IResult> GetSearchCustomer(string id, string cc, string jobaddress, string lastname, ICustomerSearchData data)
        {
            try
            {
                var results = await data.GetCustomerSearches(id, cc, jobaddress, lastname);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetCustomers(ICustomersData data)
        {
            try
            {
                return Results.Ok(await data.GetCustomers());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }


        private static async Task<IResult> GetCustomerId(string custid, ICustomersData data, ILeadTypeData test)
        {
            try
            {
                var results = await data.GetCustomerId(custid);
                if (results != null)
                {
                    var _test = await test.LeadType("htc");
                }
                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }



        private static async Task<IResult> CustomerSaveData(CustomerModel customer, ICustomersData data)
        {
            try
            {
                var results = await data.CustomerSaveData(customer);

                return Results.Ok(results);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }



        private static async Task<IResult> UpdateCustomer(CustomerModel customer, ICustomersData data)
        {
            try
            {
                await data.UpdateCustomer(customer);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }


        }
        #endregion
        #region PaidLeads

        private static async Task<IResult> InsertPaidLead(three_shipModel paidlead, IPaidLeadData data)
        {
            try
            {
                await data.InsertPaidLead(paidlead);

                return Results.Ok(data);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> GetPaidLeads(IPaidLeadData data)
        {
            try
            {
                return Results.Ok(await data.GetPaidLeads());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        #endregion
        #region LeadSources

        private static async Task<IResult> GetLeadSources(ILeadSource data)
        {
            try
            {
                return Results.Ok(await data.GetLeadSources());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetLeadSubSource(string id, ILeadSubSource data)
        {
            try
            {
                var results = await data.GetLeadSubSource(id);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        #endregion
        #region ProjectTypes

        private static async Task<IResult> GetProjectTypes(IProjectTypeData data)
        {
            try
            {
                return Results.Ok(await data.GetProjectTypes());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetDrivingDistance(IDrivingDistanceData data)
        {
            try
            {
                return Results.Ok(await data.GetDrivingDistance());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }


        #endregion
        #region Leads


        private static async Task<IResult> GetLead(string id, string cc, ILeadsData data)
        {
            try
            {
                var results = await data.GetLead(id, cc);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> GetLeadbyStatus(string status, string company_code, ILeadStatusData data)
        {
            try
            {
                return Results.Ok(await data.GetLeadbyStatus(status, company_code));
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> InsertLead(LeadsModel Lead, ILeadsData data)
        {
            try
            {
                var results = await data.InsertLead(Lead);

                return Results.Ok(results);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> UpdateLead(LeadsModel Lead, ILeadsData data)
        {
            try
            {
                await data.UpdateLead(Lead);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }


        }
        #endregion
        #region JobAddress

        private static async Task<IResult> GetJobAddresses(IJobAddressData data)
        {
            try
            {
                return Results.Ok(await data.GetJobAddresses());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertJobAddress(JobAddressModel jobaddress, IJobAddressData data)
        {
            try
            {
                var results = await data.InsertJobAddress(jobaddress);

                return Results.Ok(results);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetJobAddressInfo(string cc, string id, string custid, IJobAddressInfoData data)
        {
            try
            {
                var results = await data.GetJobAddressInfo(cc, id, custid);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdateJobAddress(JobAddressModel jobaddress, IJobAddressData data)
        {
            try
            {
                await data.UpdateJobAddress(jobaddress);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }


        }
        #endregion
        #region GeoZones
        private static async Task<IResult> GetGeoZones(string zipcode, IGeoZoneData data)
        {
            try
            {
                return Results.Ok(await data.GetGeoZone(zipcode));
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion 
        #region Status Counts
        private static async Task<IResult> LeadCounts(string company_code, ILeadCountsData data)
        {
            try
            {
                var results = await data.LeadCounts(company_code);

                if (results == null)
                {
                    LeadCountsModel emptyCounts = new LeadCountsModel();
                    emptyCounts.Company_Code = company_code;
                    return Results.Ok(emptyCounts);
                }

                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion
        #region LeadType
        private static async Task<IResult> LeadType(string company_code, ILeadTypeData data)
        {


            try
            {
                return Results.Ok(await data.LeadType(company_code));
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion
        #region Load from Job Search
        private static async Task<IResult> JobSearch(string Jobid, string company_code, IJobAddressData data, ILeadTypeData test)
        {
            try
            {
                var results = await data.GetJobAddress(Jobid, company_code);
                if (results != null)
                {
                    var _test = await test.LeadType("htc");
                }



                if (results == null) return Results.NotFound();
                return Results.Ok(results);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion
        #region Appointment
        private static async Task<IResult> GetAppointment(string company_code, string leadid, string customerid, IAppointmentData data)
        {
            try
            {
                var results = await data.GetAppointment(company_code, leadid, customerid);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertAppointment(AppointmentModel appointment, IAppointmentData data)
        {
            try
            {
                var results = await data.InsertAppointment(appointment);

                return Results.Ok(results);

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }

        private static async Task<IResult> UpdateAppointment(AppointmentModel appointment, IAppointmentData data)
        {
            try
            {
                await data.UpdateAppointment(appointment);
                return Results.Ok(data);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }


        }

        #endregion
        #region SmartSchedule

        private async static Task<IResult> ProcessAvailablity(string userName, int geoZone, int leadType, string jobAddress, string company_code, IBuildAvailibilityData data)
        {

            SmartSchedulerCode sBuild = new SmartSchedulerCode();
            await sBuild.startBuild(userName, geoZone, leadType, jobAddress, company_code);

            //var results = await GetAvailibility(userName,data);
            var results = await Task.WhenAll(GetAvailibility(userName, data));
            // **sBuild.deletetemp(userName);
            return Results.Ok(results[0]);


        }

        private static async Task<IResult> GetAvailibility(string userName, IBuildAvailibilityData data)

        {
            try
            {
                var results = await data.GetAvailibilities(userName);

                List<AvailibilityArrayModel> availabilityList = new List<AvailibilityArrayModel>();
                List<AvailibilityModel> slots = new List<AvailibilityModel>();
                List<EmployeeModel> employeeList = new List<EmployeeModel>();

                slots.AddRange(results);

                foreach (var slot in slots)
                {
                    if (availabilityList.Any(availability => availability.DateExists(slot.date)) == false)
                    {
                        AvailibilityArrayModel availabilityModel = new AvailibilityArrayModel();
                        availabilityModel.date = slot.date;
                        availabilityModel.employees = new List<EmployeeModel>();
                        availabilityList.Add(availabilityModel);
                    }

                    EmployeeModel employee = new EmployeeModel();

                    employee.date = slot.date;
                    employee.name = slot.employee;
                    employee.userid = slot.userid;
                    employee.slots = new List<AvailibilityModel>();

                    if (employeeList.Any(emp => emp.Equals(employee)) == false)
                    {
                        employeeList.Add(employee);
                    }
                }

                foreach (EmployeeModel emp in employeeList)
                {
                    foreach (AvailibilityModel slot in slots)
                    {
                        if (slot.userid == emp.userid && slot.date == emp.date)
                        {
                            emp.slots!.Add(slot);
                        }
                    }
                }

                foreach (AvailibilityArrayModel availability in availabilityList)
                {
                    foreach (EmployeeModel emp in employeeList)
                    {
                        if (emp.date == availability.date)
                        {
                            availability.employees!.Add(emp);
                        }
                    }
                }

                Console.WriteLine("getavail done");
                availabilityList = availabilityList.OrderBy(order => order.date).ToList();

                return Results.Ok(availabilityList);
                //return (availabilityList);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        #endregion
        #region DrivingDistance
        #endregion
        #region Notes
        private static async Task<IResult> GetAllNotes(string cc, string jobaddressid, INotesData data)
        {
            try
            {
                var results = await data.GetAllNotes(cc, jobaddressid);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetNotesfromType(string cc, string id, string idtypename, INotesData data)
        {
            try
            {
                var results = await data.GetNotesfromType(cc, id, idtypename);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion
        #region SalesCalendar
        private static async Task<IResult> GetSalesCalendar(string cc, string date, string employeeId, ISalesCalendarData data)
        {
            try
            {
                var results = await data.GetSalesCalendar(cc, date, employeeId);

                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion

        #region Attachments         private static async Task<IResult> AttachmentsSaveData(Attachment attachment, IJobAddressData data)        {            try            {
                if (!string.IsNullOrEmpty(attachment.AttachmentBase64String))                {
                    DateTime now = DateTime.Now;

                    string date = now.Date.ToString();
                    string day = now.Day.ToString();
                    string year1 = now.DayOfYear.ToString();
                    string year = now.Year.ToString();
                    string hr = now.Hour.ToString();
                    string min = now.Minute.ToString();
                    string sec = now.Second.ToString();
                    string month = now.Month.ToString();


                    string todaysDate = year + "" + month + "" + day + "" + hr + "" + min + "" + sec;
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Assets\Images"); //Path

                    var imagePath = "Assets/Images/";

                    //Check if directory exist
                    if (!System.IO.Directory.Exists(filePath))
                    {
                        System.IO.Directory.CreateDirectory(filePath); //Create directory if it doesn't exist
                    }

                    attachment.AttachmentName = attachment.CustomerId + "_" + attachment.JobAddressId + "_" + todaysDate + ".png";

                    //set the image path                    
                    attachment.AttachmentPath = imagePath + attachment.AttachmentName;
                    var arr = attachment.AttachmentBase64String.Split(',');

                    byte[] imageBytes = Convert.FromBase64String(arr[1]);

                    File.WriteAllBytes(Path.Combine(filePath, attachment.AttachmentName), imageBytes);
                }

                var results = await data.InsertAttachments(attachment);                return Results.Ok(results);            }            catch (Exception ex)            {                return Results.Problem(ex.Message);            }        }

        private static async Task<IResult> GetAttachementByCompany(string cc, string id, string custid, IJobAddressData data)
        {
            try
            {
                var results = await data.GetAttachementByCompany(cc, id, custid);
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetAttachmentByteArray(string attachmentId, IJobAddressData data)
        {
            try
            {
                var results = await data.GetAttachementById(attachmentId);
                string pdfFilePath = "E:\\Code\\Helitech_PWA\\Archive\\Accutrax-API-Dev-master\\AccutracMinimalAPI\\wwwroot\\" + results.AttachmentPath; //Need to replace this line with dynamic server path
                byte[] bytes = File.ReadAllBytes(pdfFilePath);
                return Results.Ok(bytes);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        #endregion

    }


}