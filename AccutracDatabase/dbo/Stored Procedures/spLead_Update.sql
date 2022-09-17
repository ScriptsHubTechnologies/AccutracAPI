-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spLead_Update]
@Company_Code as Nvarchar(50),
@LeadId as int,
@Customerid int,
@JobAddressId int,
@ConfirmLeadType as Nvarchar(50) ,
@ReferredBy as Nvarchar(50),
@Notes as Nvarchar(50) ,
@Status as Nvarchar(50) ,
@CreatedDate as Nvarchar(50),
@Createdby as Nvarchar(50),
@UpdatedDate as Nvarchar(50),
@UpdatedBy as Nvarchar(50),
@IsDeleted as int,
@LeadSourceId as int,
@LeadSourceName as Nvarchar(50) ,
@LeadSubSourceId as int,
@LeadSubSourceName as Nvarchar(50),
@GeoZoneId as int,
@GeoZoneName as Nvarchar(50),
@ZoneId as int,
@ZoneName as Nvarchar(50),
@JobAddress as Nvarchar(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

UPDATE       Leads
SET                Company_Code = @Company_Code, JobAddressId = @JobAddressId, CustomerId = @CustomerId, ConfirmLeadType = @ConfirmLeadType, ReferredBy = @ReferredBy, Notes = @Notes, Status = @Status, 
                         CreatedDate = @CreatedDate, CreatedBy = @CreatedBy, UpdatedDate = @UpdatedDate, UpdatedBy = @UpdatedBy, IsDeleted = @IsDeleted, LeadSourceId = @LeadSourceId, LeadSourceName = @LeadSourceName, 
                         LeadSubSourceId = @LeadSubSourceId, LeadSubSourceName = @LeadSubSourceName, GeoZoneId = @GeoZoneId, GeoZoneName = @GeoZoneName, ZoneId = @ZoneId, ZoneName = @ZoneName, JobAddress = @JobAddress
WHERE        (Company_Code = @Company_Code) AND (LeadId = @LeadId);

end
 
