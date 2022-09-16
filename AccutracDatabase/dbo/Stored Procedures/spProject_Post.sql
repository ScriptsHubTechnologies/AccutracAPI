
Create procedure [dbo].[spProject_Post]

           @company_code as nchar(10) 
           ,@contractId as int 
           ,@proposalId as nvarchar(50) 
           ,@customerId as int 
           ,@jobaddressId as int 
           ,@estimatorUserId as int 
           ,@estimator as nvarchar(150) 
           ,@projectTypeId as int 
           ,@projectTypeName as nvarchar(150) 
           ,@Status as int 
           ,@projectStatusName as nvarchar(50) 
           ,@IsCancelled as bit 
           ,@Total as decimal(18,0) 
           ,@CommissionPaid as decimal(18,0) 
           ,@createdDate as date 
           ,@createdBy as nvarchar(150) 



as 
begin
INSERT INTO Project
                  (company_code, contractId, proposalId, customerId, jobaddressId, estimatorUserId, estimator, projectTypeId, projectTypeName, Status, projectStatusName, IsCancelled, Total, CommissionPaid, createdDate, createdBy)
VALUES (@company_code,@contractId,@proposalId,@customerId,@jobaddressId,@estimatorUserId,@estimator,@projectTypeId,@projectTypeName,@Status,@projectStatusName, @IsCancelled,@Total,@CommissionPaid,@createdDate,@createdBy)
	end

