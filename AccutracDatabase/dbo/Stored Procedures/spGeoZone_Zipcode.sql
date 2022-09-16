
CREATE procedure [dbo].[spGeoZone_Zipcode]
@zipcode nvarchar(10)

as 
begin
	 SELECT        ZipCodes.Zip, GeoZone.ZoneId, Zones.Name as ZoneName, ZipCodes.GeoZoneId, GeoZone.Name AS GeoZoneName
FROM            ZipCodes INNER JOIN
                         GeoZone ON ZipCodes.GeoZoneId = GeoZone.Id INNER JOIN
                         Zones ON GeoZone.ZoneId = Zones.Id where zipCodes.isdeleted =0 and ZipCodes.Zip like @zipcode;
end