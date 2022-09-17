
CREATE procedure [dbo].[spGetProposalbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT company_code, ProposalId, CustomerId, LeadId, JobAddressId, AppointmentId, CustomerVisitId,Status, ProposalStatusName, IsGenerated, Total, discount,assignedto,assignedName
FROM     Proposal
WHERE  (company_code = @company_code) AND (JobAddressId = @jobaddressid)
	end

