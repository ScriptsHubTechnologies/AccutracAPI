-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spCustomerVisit_Update]

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
@assignedname as nvarchar(100)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   
UPDATE [dbo].[CustomerVisit]
   SET 
		Status = @Status 
      ,statusName = @statusName 
      ,Checklist = @Checklist 
      ,Walkthrough = @Walkthrough
	  ,Reason = @Reason where
Company_Code=@Company_Code and customervisitId=@customervisitId;
end