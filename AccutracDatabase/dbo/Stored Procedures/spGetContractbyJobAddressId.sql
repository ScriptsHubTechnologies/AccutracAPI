
Create procedure [dbo].[spGetContractbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT company_code, contractId, proposalId, customerVisitId, AppointmentId, JobAddressId, CustomerId, LeadId, estimatorUserid, Estimator, Total, CommisionPaid, Approved, ApprovalDate, Aprovedby, ProceedtoSchedule
FROM     Contract
WHERE  (company_code = @company_code) AND (JobAddressId = @jobaddressid)
	end

