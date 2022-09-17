
CREATE procedure [dbo].[spEstAvailSkillData]

@Company_Code nchar(10),
@userid nvarchar(50)


as 
begin
--SELECT EstSkillAvail.id, EstSkillAvail.Company_Code, EstSkillAvail.UserId, EstSkillAvail.Name, EstSkillAvail.WkDayNumber, EstSkillAvail.WkDayName, EstSkillAvail.StartDate, EstSkillAvail.StartTime, EstSkillAvail.EndTime, 
--                  EstSkillAvail.StartLocation, EstSkillAvail.IsDeleted, EstSkillAvail.Createdby, EstSkillAvail.CreatedDate, EstSkillAvail.EmployeeCode, EstSkillAvail.LeadType, EstSkillAvail.AppointmentDuration, EstSkillAvail.GeoZoneId, 
--                  EstSkillAvail.uniqueid
--FROM     EstSkillAvail INNER JOIN
--                      (SELECT MAX(StartDate) AS StartDate, WkDayNumber
--                       FROM      EstSkillAvail AS EstSkillAvail_1
--                       WHERE   (UserId = @userid) AND (StartDate < GETDATE())
--                       GROUP BY WkDayNumber) AS d ON EstSkillAvail.StartDate >= d.StartDate AND EstSkillAvail.WkDayNumber = d.WkDayNumber
--WHERE  (EstSkillAvail.Company_Code = @company_code) AND (EstSkillAvail.UserId = @userid)
--ORDER BY EstSkillAvail.WkDayNumber

SELECT EstSkillAvail.id, EstSkillAvail.Company_Code, EstSkillAvail.UserId, EstSkillAvail.Name, EstSkillAvail.WkDayNumber, EstSkillAvail.WkDayName, EstSkillAvail.StartDate, EstSkillAvail.StartTime, EstSkillAvail.EndTime, 
                  EstSkillAvail.StartLocation, EstSkillAvail.IsDeleted, EstSkillAvail.Createdby, EstSkillAvail.CreatedDate, EstSkillAvail.EmployeeCode, EstSkillAvail.LeadType, EstSkillAvail.AppointmentDuration, EstSkillAvail.GeoZoneId, 
                  EstSkillAvail.uniqueid
FROM     EstSkillAvail INNER JOIN
                      (SELECT MAX(StartDate) AS StartDate, WkDayNumber
                       FROM      EstSkillAvail AS EstSkillAvail_1
                       WHERE   (UserId = @userid)
                       GROUP BY WkDayNumber) AS d ON EstSkillAvail.StartDate >= d.StartDate
WHERE  (EstSkillAvail.Company_Code = @company_code) AND (EstSkillAvail.UserId = @userid)
ORDER BY EstSkillAvail.WkDayNumber
end