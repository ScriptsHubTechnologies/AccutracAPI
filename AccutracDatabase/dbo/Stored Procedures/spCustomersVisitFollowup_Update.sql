
Create procedure [dbo].[spCustomersVisitFollowup_Update]

@Company_Code as nvarchar(10)=  '',
@followupid as int =0,
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

update followup  set  CustomerVisitId=@CustomerVisitId, AppointmentId= @AppointmentId, LeadId= @LeadId, JobAddressId= @JobAddressId, CustomerId= @CustomerId, FollowupDate= @FollowupDate, Note= @Note, CreatedDate= @CreatedDate, CreatedBy= @CreatedBy, Userid= @Userid, IsCompleted=@IsCompleted where followupid =@followupid and Company_Code=@Company_Code 


                       

end

