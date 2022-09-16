CREATE procedure [dbo].[spAppointments_GetCount]
@company_code nvarchar(10)

as 
begin


SELECT Company_Code, (ScheduledAppointmentBacklog +ApprovedNewAppointments+ HotQuote) as Total,ScheduledAppointmentBacklog, ApprovedNewAppointments, HotQuote FROM (SELECT COUNT(CASE WHEN status = 0 THEN 1 ELSE NULL END) AS ScheduledAppointmentBacklog, COUNT(CASE WHEN status = 1 THEN 1 ELSE NULL END) AS ApprovedNewAppointments, COUNT(CASE WHEN status = 2 THEN 1 ELSE NULL END) AS HotQuote, Company_Code
FROM     Appointment
WHERE  (NOT EXISTS
                      (SELECT AppointmentId
FROM     CustomerVisit
WHERE  (status <>1)))
GROUP BY Company_Code) AS c WHERE (ltrim(rtrim(Company_Code)) = @company_code)


end

