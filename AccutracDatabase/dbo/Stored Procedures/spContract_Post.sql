
Create procedure [dbo].[spContract_Post]

@company_code as nchar(10)
           ,@contractId as int
           ,@proposalId as  Nvarchar(50)
           ,@customerVisitId as int
           ,@AppointmentId as int
           ,@JobAddressId as int
           ,@CustomerId as int
           ,@LeadId as int
           ,@estimatorUserid as nvarchar(50)
           ,@Estimator as nvarchar(150)
           ,@Total as decimal(18,0)
           ,@CommisionPaid as decimal(18,0)
           ,@Approved as bit
           ,@ApprovalDate as date
           ,@Aprovedby as nvarchar(50)
           ,@ProceedtoSchedule as bit



as 
begin
INSERT INTO Contract
                  (company_code,  proposalId, customerVisitId, AppointmentId, JobAddressId, CustomerId, LeadId, estimatorUserid, Estimator, Total, CommisionPaid, Approved, ApprovalDate, Aprovedby, ProceedtoSchedule)
VALUES (@company_code,@proposalId,@customerVisitId,@AppointmentId,@JobAddressId,@CustomerId,@LeadId,@estimatorUserid,@Estimator,@Total,@CommisionPaid,@Approved,@ApprovalDate,@Aprovedby,@ProceedtoSchedule)
	end

