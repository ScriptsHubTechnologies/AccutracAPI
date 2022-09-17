
CREATE procedure [dbo].[spGetProposal]

@Company_Code as Nvarchar(50) =  '',

@customerid as int




as 
begin
SELECT company_code, ProposalId, CustomerId, LeadId, JobAddressId, AppointmentId, CustomerVisitId, status, ProposalStatusName, IsGenerated, Total, discount,assignedto,assignedName
FROM     Proposal
WHERE  (company_code = @company_code) AND (customerid = @customerid)
	end

