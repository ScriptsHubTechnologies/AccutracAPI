
Create procedure [dbo].[spGetAppointmentbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT Company_Code, AppointmentId, CustomerId, LeadId, JobAddressId, AppointmentType, AppointmentTypeName, Status, StatusName, CreatedDate, CreatedBy, AssignedTo, AssignedName, Date, StartTime, EndTime, DeleteReason, 
                  UpdatedDate, UpdatedBy, IsDeleted
FROM     Appointment
WHERE  (Company_Code = @company_code) AND (JobAddressId = @jobaddressid)
	end

