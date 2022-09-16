
CREATE procedure [dbo].[spGetAppointment]
@company_code nvarchar(50),
@AppointmentId int



as 
begin
SELECT Leads.Company_Code, Leads.CustomerId, Leads.LeadId, Leads.JobAddressId, Appointment.AppointmentId, JobAddress.JobAddress1 + CASE WHEN JobAddress.JobAddress2 IS NULL 
                  THEN '' ELSE JobAddress.jobaddress2 END + ' ' + JobAddress.JobCity + ', ' + JobAddress.jobState + ' ' + JobAddress.jobZip AS JobAddress, case when Customers.CompanyName is null then Customers.FirstName+' '+ Customers.LastName else Customers.CompanyName end as Customer, 
                  Customers.MailingAddress + CASE WHEN Customers.MailingAddress2 IS NULL THEN '' ELSE Customers.MailingAddress2 END + ' ' + Customers.MailingCity + ', ' + Customers.MailingState + ' ' + CONVERT(nvarchar(10), 
                  Customers.MailingZip) AS MailingAddress, Customers.Email, Customers.Phone, Customers.PhoneType, Appointment.AppointmentType, Appointment.AppointmentTypeName, Appointment.Status, Appointment.StatusName, 
                  Appointment.CreatedDate, Appointment.CreatedBy, Appointment.AssignedTo, Appointment.AssignedName, Appointment.Date, Appointment.StartTime, Appointment.EndTime, Appointment.DeleteReason, Appointment.UpdatedDate, 
                  Appointment.UpdatedBy, Appointment.IsDeleted
FROM     Leads INNER JOIN
                  JobAddress ON Leads.Company_Code = JobAddress.Company_Code AND Leads.JobAddressId = JobAddress.JobAddressId AND Leads.CustomerId = JobAddress.CustomerId INNER JOIN
                  Appointment ON Leads.Company_Code = Appointment.Company_Code AND Leads.CustomerId = Appointment.CustomerId AND Leads.LeadId = Appointment.LeadId INNER JOIN
                  Customers ON Leads.CustomerId = Customers.Customerid AND Leads.Company_Code = Customers.Company_Code
WHERE (Appointment.Company_Code = @company_code) AND (Appointment.AppointmentId = @AppointmentId)

end