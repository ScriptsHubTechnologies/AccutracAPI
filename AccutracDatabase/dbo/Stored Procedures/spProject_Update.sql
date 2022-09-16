
Create procedure [dbo].[spProject_Update]

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
Update Project set
                  company_code=@company_code, contractId=@contractId, proposalId=@proposalId, customerId=@customerId, jobaddressId=@jobaddressId, estimatorUserId=@estimatorUserId, estimator=@estimator, projectTypeId=@projectTypeId, projectTypeName=@projectTypeName, Status=@Status, projectStatusName=@projectStatusName, IsCancelled=@IsCancelled, Total=@Total, CommissionPaid=@CommissionPaid, createdDate=@createdDate, createdBy=@createdBy

	end

