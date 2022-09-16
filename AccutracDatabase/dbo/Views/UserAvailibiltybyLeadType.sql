/****** Script for SelectTopNRows command from SSMS  ******/
--delete
--  FROM [Helitrack_Production_5].[dbo].[appointment] where starttime is null

--SELECT appointment.Company_Code, appointment.CustomerId, appointment.LeadId, appointment.AppointmentType, appointment.AppointmentTypeName, appointment.CreatedDate, appointment.CreatedBy, appointment.IsApproved, 
--                  appointment.Status, appointment.StatusName, appointment.Date, appointment.StartTime, appointment.EndTime, appointment.IsDeleted, appointment.DeletedReason, appointment.UpdatedDate, appointment.Updatedby, Skills.Employee, 
--                  LeadType.LeadTypeName
--FROM     appointment INNER JOIN
--                  Skills ON appointment.AssignedTo = Skills.Id INNER JOIN
--                  LeadType ON Skills.LeadType = LeadType.id



create view [UserAvailibiltybyLeadType] as SELECT distinct Skills.aspNetUserId, Skills.Employee, Avail.id, Avail.start, Avail.Day, Avail.StartTime, Avail.EndTime, LeadType.LeadType, LeadType.LeadTypeName
FROM     Skills INNER JOIN
                      (SELECT AD.id, AD.AspNetUserId, AD.start, AD.Day, availability_1.StartTime, availability_1.EndTime
                       FROM      (SELECT MAX(Id) AS id, AspNetUserId, MAX(StartDate) AS start, Day
                                          FROM      availability
                                          WHERE   (IsDeleted = 0)
                                          GROUP BY AspNetUserId, Day) AS AD INNER JOIN
                                         availability AS availability_1 ON AD.AspNetUserId = availability_1.AspNetUserId AND AD.id = availability_1.Id) AS Avail ON Skills.aspNetUserId = Avail.AspNetUserId INNER JOIN
                  LeadType ON Skills.LeadType = LeadType.LeadType --where LeadType.LeadType=1 order by aspnetuserid,day,StartTime 


--				  SELECT  max(Id) as id, AspNetUserId, max(StartDate) as start,day
--FROM     availability
--WHERE  (IsDeleted = 0) group by aspnetuserid,day --order by startdate desc

----select * from availability where  aspnetuserid='adcead71-8d20-4514-9b59-bee7c156a2b1'