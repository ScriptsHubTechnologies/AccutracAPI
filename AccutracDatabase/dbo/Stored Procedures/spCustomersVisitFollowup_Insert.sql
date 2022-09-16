
Create procedure [dbo].[spCustomersVisitFollowup_Insert]

@Company_Code as nvarchar(10)=  '',
     @CustomerVisitId as int =0,
	 @AppointmentId  as int =0,
	 @LeadId  as int =0,
	 @JobAddressId as int =0,
	 @CustomerId as int =0,
	 @FollowupDate as date,
	 @Note as nvarchar(max),
	 @CreatedDate as date,
	 @CreatedBy as nvarchar(100),
	 @Userid as nvarchar(50),
	 @IsCompleted as bit
as 
begin

insert into followup  (company_code, CustomerVisitId, AppointmentId, LeadId, JobAddressId, CustomerId, FollowupDate, Note, CreatedDate, CreatedBy, Userid, IsCompleted)
values  (@company_code, @CustomerVisitId, @AppointmentId, @LeadId, @JobAddressId, @CustomerId, @FollowupDate, @Note, @CreatedDate, @CreatedBy, @Userid, @IsCompleted)

                       

end

