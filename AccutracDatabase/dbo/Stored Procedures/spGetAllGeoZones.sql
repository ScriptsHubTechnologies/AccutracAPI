
CREATE procedure [dbo].[spGetAllGeoZones]
@company_code nvarchar(10)

as 
begin
	SELECT        GeoZone.Id, GeoZone.Company_Code, GeoZone.ZoneId, Zones.Name AS ZoneName, GeoZone.Name, GeoZone.CreatedDate, GeoZone.CreatedBy, GeoZone.UpdatedDate, GeoZone.UpdatedBy, GeoZone.IsDeleted
FROM            GeoZone INNER JOIN
                         Zones ON GeoZone.Company_Code = Zones.Company_Code AND GeoZone.ZoneId = Zones.Id
WHERE        (GeoZone.IsDeleted = 0) AND (GeoZone.Company_Code = @Company_Code);
end