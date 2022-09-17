
Create procedure [dbo].[spGetLeadsbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddressId as int




as 
begin
SELECT Company_Code, LeadId, JobAddressId, JobAddress, CustomerId, ConfirmLeadType, ReferredBy, Notes, Status, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy, IsDeleted, LeadSourceId, LeadSourceName, LeadSubSourceId, 
                  LeadSubSourceName, LeadProjectType, LeadProjectTypeName, GeoZoneId, GeoZoneName, Zoneid, ZoneName
FROM     Leads
WHERE  (Company_Code = @company_code) AND (JobAddressId = @jobaddressid)
	end

