
create procedure [dbo].spUserAvailibility
@date date


as 
begin
	SELECT e.aspNetUserId, e.Employee, e.LeadType, e.LeadTypeName, e.ZoneId, aval.Day, aval.StartTime, aval.EndTime
FROM     (SELECT Skills.aspNetUserId, Skills.Employee, LeadType.LeadType, LeadType.LeadTypeName, UserZones.ZoneId
                  FROM      Skills INNER JOIN
                                    UserZones ON Skills.aspNetUserId = UserZones.AspNetUserId INNER JOIN
                                    LeadType ON Skills.LeadType = LeadType.LeadType
                  WHERE   (UserZones.IsDeleted = 0)) AS e INNER JOIN
                      (SELECT d.startdate, availability_1.AspNetUserId, availability_1.Day, availability_1.StartTime, availability_1.EndTime
                       FROM      (SELECT Id, MAX(StartDate) AS startdate
                                          FROM      availability
                                          WHERE   (IsDeleted = 0)
                                          GROUP BY Id) AS d INNER JOIN
                                         availability AS availability_1 ON d.Id = availability_1.Id
                       WHERE   (d.startdate < @date)) AS aval ON e.aspNetUserId = aval.AspNetUserId
end