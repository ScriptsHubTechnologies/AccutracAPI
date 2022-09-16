
CREATE procedure [dbo].[spLeads_Post]

@Company_Code as Nvarchar(50) =  '',
@LeadId as int,
@Customerid int,
@JobAddressId int,
@ConfirmLeadType as Nvarchar(50) =  '',
@ReferredBy as Nvarchar(50) =  '',
@Notes as Nvarchar(50) =  '',
@Status as Nvarchar(50) =  '',
@CreatedDate as Nvarchar(50) =  '',
@Createdby as Nvarchar(50) =  '',
@UpdatedDate as Nvarchar(50) =  '',
@UpdatedBy as Nvarchar(50) =  '',
@IsDeleted as int,
@LeadType as Nvarchar(50) =  '',
@LeadSourceId as int,
@LeadSourceName as Nvarchar(50) =  '',
@LeadSubSourceId as int,
@LeadSubSourceName as Nvarchar(50) =  '',
@GeoZoneId as int,
@GeoZoneName as Nvarchar(50),
@ZoneId as int,
@ZoneName as Nvarchar(50),
@JobAddress as Nvarchar(50)



as 
begin
	insert into dbo.Leads (Company_Code,  CustomerId, jobaddressid,ConfirmLeadType, ReferredBy, Notes, Status, CreatedDate, CreatedBy, UpdatedBy , UpdatedDate , IsDeleted, LeadSourceId,LeadSourceName,LeadSubSourceId,LeadSubSourceName,GeoZoneId,GeoZoneName,Zoneid,ZoneName,JobAddress) values (@Company_Code,  @CustomerId, @jobaddressid,@ConfirmLeadType, @ReferredBy, @Notes, @Status, @CreatedDate, @CreatedBy, @UpdatedBy , @UpdatedDate , @IsDeleted,@LeadSourceId,@LeadSourceName,@LeadSubSourceId,@LeadSubSourceName,@GeoZoneId,@GeoZoneName,@Zoneid,@ZoneName,@JobAddress);

	
	end

