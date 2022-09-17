
CREATE procedure [dbo].[spAppointment_Update]


 @CustomerId int,
 @Company_Code Nvarchar(10),
@AppointmentId nvarchar(50),
@LeadId int,
@JobAddressId int,
@AppointmentType int,
@AppointmentTypeName nvarchar(50),
@CreatedDate datetime,
@CreatedBy nvarchar(50),
@IsApproved bit,
@Status int,
@StatusName nvarchar(50),
@AssignedTo nvarchar(50),
@StartDateTime datetime,
@EndDateTime datetime,
@IsDeleted bit


as 
begin
	 update Appointments set isdeleted=1 , status= 3 , statusname='AppointmentNeedingReschedule' where Company_Code =@Company_Code  and CustomerId =@CustomerId and AppointmentId=@AppointmentId  

	end