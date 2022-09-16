
CREATE procedure [dbo].[spGetCustomersVisit_byId]
@company_code nvarchar(10),
@appointmentId int 


as 
begin
	SELECT Company_Code, CustomerVisitId, CustomerId, JobAddressId, AppointmentId, LeadId, AppointmentType, AppointmentTypeName, CreatedDate, CreatedBy, Status, statusName, Checklist, Walkthrough, Reason,assignedto,assignedName from CustomerVisit  where Company_Code=@company_code and AppointmentId=@appointmentId 
end