
CREATE procedure [dbo].[spGetProposalbyId]

@Company_Code as Nvarchar(50) =  '',

@ProposalId as Nvarchar(50) =''




as 
begin
SELECT company_code, ProposalId, CustomerId, LeadId, JobAddressId, AppointmentId, CustomerVisitId, status, ProposalStatusName, IsGenerated, Total, discount,discountPercentage,discountedTotal, assignedto,assignedName, createdDate
FROM     Proposal
WHERE  (company_code = @company_code) AND (ProposalId  = @ProposalId )
	end

