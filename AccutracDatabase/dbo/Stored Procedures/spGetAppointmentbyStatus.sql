
CREATE procedure [dbo].[spGetAppointmentbyStatus]
@company_code nvarchar(50),
@status int



as 
begin
SELECT distinct Appointment.Company_Code, Appointment.AppointmentId, Appointment.CustomerId, Appointment.LeadId, Appointment.JobAddressId, Appointment.AppointmentType, Appointment.AppointmentTypeName, Appointment.Status, 
                  Appointment.StatusName, Appointment.CreatedDate, Appointment.CreatedBy, Appointment.AssignedTo, Appointment.AssignedName, Appointment.Date, Appointment.StartTime, Appointment.EndTime, Appointment.DeleteReason, 
                  Appointment.UpdatedDate, Appointment.UpdatedBy, Appointment.IsDeleted,  JobAddress.JobAddress1 + case when JobAddress.JobAddress2 is null then '' else jobaddress.JobAddress2 end + ' ' +JobAddress.JobCity +', ' + JobAddress.jobState+' '+ JobAddress.jobZip as JobAddress, case when Customers.CompanyName is null then customers.firstname +' '+customers.lastname else customers.CompanyName end as Customer
FROM     Appointment INNER JOIN
                  Customers ON Appointment.CustomerId = Customers.Customerid AND Appointment.Company_Code = Customers.Company_Code INNER JOIN
                  JobAddress ON Customers.Customerid = JobAddress.CustomerId AND Appointment.Company_Code = JobAddress.Company_Code AND Appointment.CustomerId = JobAddress.CustomerId AND 
                  Appointment.JobAddressId = JobAddress.JobAddressId
WHERE  (Appointment.Company_Code = @company_code) AND (Appointment.Status = @status) AND (NOT EXISTS
                      (SELECT AppointmentId
                       FROM      CustomerVisit
                       WHERE   (Status <> 1)))

end