
create procedure [dbo].spEstGeoZone
@company_code nvarchar(10),
@userid nchar(50)
as 
begin
SELECT ESA.Company_Code, WkDayNumber, WkDayName, StartDate, AppointmentDuration, GeoZoneId, GZ.Name As GeoZoneName
FROM     EstSkillAvail ESA
JOIN GeoZone AS GZ ON GZ.Id = ESA.GeoZoneId
WHERE  (ESA.Company_Code = @company_code) AND (UserId = @userid)
GROUP BY ESA.Company_Code, WkDayName, WkDayNumber, StartDate, AppointmentDuration, GeoZoneId, GZ.Name
end