
CREATE procedure [dbo].[spGetCVbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT Company_Code, CustomerVisitId, CustomerId, JobAddressId, AppointmentId, LeadId, AppointmentType, AppointmentTypeName, CreatedDate, CreatedBy, Status, Reason
FROM     CustomerVisit
WHERE  (Company_Code = @company_code) AND (JobAddressId = @jobaddressid)
	end

