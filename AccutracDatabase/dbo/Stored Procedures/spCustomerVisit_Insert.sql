
CREATE procedure [dbo].[spCustomerVisit_Insert]

@Company_Code as Nvarchar(50) =  '',
@CustomerVisitId as int,
@customerId as int,
@jobaddressId as int,
@appointmentId as int,
@leadId as int,
@AppointmentType as int,
@AppointmentTypeName as nvarchar(150),
@createdDate as date,
@Createdby as nvarchar(150),
@status as int,
@statusName as nvarchar(150),
@Checklist as nvarchar(max),
@Walkthrough as nvarchar(max),
@Reason as nvarchar(max),
@assignedto as nvarchar(50),
@AssignedName as nvarchar(100)




as 
begin
delete from helitrack_production_5.dbo.CustomerVisit where exists (select * from helitrack_production_5.dbo.CustomerVisit as b where helitrack_production_5.dbo.CustomerVisit.CustomerVisitId=@CustomerVisitId )

INSERT INTO CustomerVisit
                  (Company_Code, CustomerId, JobAddressId, AppointmentId, LeadId, AppointmentType, AppointmentTypeName, CreatedDate, CreatedBy, Status, statusName, Checklist, Walkthrough, reason,assignedto,AssignedName)
VALUES (@Company_Code, @CustomerId, @jobAddressId, @AppointmentId, @LeadId, @AppointmentType, @AppointmentTypeName, @CreatedDate, @CreatedBy, @Status, @statusName, @Checklist, @Walkthrough,@reason,@assignedto,@AssignedName)
	end

