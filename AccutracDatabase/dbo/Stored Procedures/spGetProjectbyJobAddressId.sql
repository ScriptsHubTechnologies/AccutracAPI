
create procedure [dbo].[spGetProjectbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT company_code, projectId, contractId, proposalId, customerId, jobaddressId, estimatorUserId, estimator, projectTypeId, projectTypeName, Status AS Expr5, projectStatusName, IsCancelled, Total AS Expr6, CommissionPaid, createdDate, 
                  createdBy
FROM     Project
WHERE  (jobaddressId = @jobaddressid) AND (company_code = @company_code)
	end

