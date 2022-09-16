
CREATE procedure [dbo].[spSalesCalendar]
@cc nvarchar(10),
@date date,
@employeeid nvarchar(50)



as 
begin
SELECT        a.Company_Code, a.AppointmentId, a.CustomerId,  a.JobAddressId, a.AppointmentTypeName, a.AssignedTo, a.Date, a.StartTime, a.EndTime, Customers.FirstName +' ' + Customers.LastName as CustomerName, a.JobAddress,Customers.Phone, Customers.PhoneType
FROM            (SELECT      distinct Appointment.Company_Code, Appointment.AppointmentId, Appointment.CustomerId, Appointment.LeadId, Appointment.AppointmentTypeName, Appointment.AssignedTo, Appointment.Date, 
                                                    Appointment.StartTime, Appointment.EndTime, Leads.JobAddressId, Leads.JobAddress
                          FROM            Appointment INNER JOIN
                                                    Leads ON Appointment.Company_Code = Leads.Company_Code AND Appointment.LeadId = Leads.LeadId AND Appointment.CustomerId = Leads.CustomerId
                          WHERE        (Appointment.Company_Code = @cc) AND (DATEPART(yyyy, Appointment.Date) = DATEPART(yyyy, @date)) AND (DATEPART(mm, Appointment.Date) = DATEPART(mm, @date)) AND Appointment.AssignedTo = @employeeid
                          ) AS a INNER JOIN
                         Customers ON a.CustomerId = Customers.Customerid AND a.Company_Code = Customers.Company_Code;
end