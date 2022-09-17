
Create procedure [dbo].[spGetCustomersVisitFollowup]
@company_code nvarchar(50),
@customervisitId int



as 
begin
SELECT company_code, FollowupId, CustomerVisitId, AppointmentId, LeadId, JobAddressId, CustomerId, FollowupDate, Note, CreatedDate, CreatedBy, Userid, IsCompleted
FROM     Followup
WHERE (Company_Code = @company_code) AND (customervisitId = @customervisitId)

end