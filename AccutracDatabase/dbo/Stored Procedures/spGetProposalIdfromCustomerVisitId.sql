
create procedure [dbo].[spGetProposalIdfromCustomerVisitId]

@Company_Code nchar(10),
@customervisitid int


as 
begin
SELECT company_code, ProposalId, CustomerId, LeadId, JobAddressId, AppointmentId, CustomerVisitId, status, ProposalStatusName, IsGenerated, Total, Discount
FROM     Proposal

WHERE  (Company_Code = @Company_Code) AND (CustomerVisitId = @customervisitid)
end