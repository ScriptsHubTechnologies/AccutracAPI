
CREATE procedure [dbo].[spAppointment_Post]

@Company_Code as Nvarchar(50) =  '',
@AppointmentId as int output,
@CustomerId as int,
@LeadId as int,
@JobAddressId as int,
@AppointmentType as int,
@AppointmentTypeName as Nvarchar(50) =  '',
@CreatedDate as Nvarchar(75) =  '',
@CreatedBy as date =  '6/9/2022',
@Status as int,
@StatusName as Nvarchar(50) =  '',
@AssignedTo as Nvarchar(50) =  '',
@AssignedName Nvarchar(50) =  '',
@Date as Nvarchar(75) =  '',
@StartTime as Nvarchar(50) =  '',
@EndTime as Nvarchar(50) =  '',
@DeleteReason as Nvarchar(50) =  '',
@IsDeleted as bit,
@UpdatedBy as Nvarchar(50) =  '',
@UpdatedDate as Nvarchar(50) =  ''



as 
begin
	insert into dbo.appointment(Company_Code, CustomerId, LeadId,JobAddressId, AppointmentType, AppointmentTypeName, CreatedDate, CreatedBy, Status, StatusName, AssignedTo, AssignedName, Date, StartTime, EndTime, DeleteReason, IsDeleted, UpdatedBy,UpdatedDate) 
	values (@Company_Code, @CustomerId, @LeadId,@JobAddressId, @AppointmentType, @AppointmentTypeName, @CreatedDate, @CreatedBy, @Status, @StatusName, @AssignedTo, @AssignedName, @Date, @StartTime, @EndTime, @DeleteReason, @IsDeleted, @UpdatedBy, @UpdatedDate);

	Select @AppointmentId = @@IDENTITY;
	end

