﻿--create view testjim as SELECT  Date, Employee, userid, CustomerId, LeadId, StartTime, EndTime, Taken FROM (SELECT appointment.Company_Code,
--                  appointment.CustomerId, appointment.LeadId, [3686ec8f-190e-4889-9eeb-a7500f777532].Date,  [3686ec8f-190e-4889-9eeb-a7500f777532].Employee,  [3686ec8f-190e-4889-9eeb-a7500f777532].userid, 
--                  [3686ec8f-190e-4889-9eeb-a7500f777532].StartTime,  [3686ec8f-190e-4889-9eeb-a7500f777532].EndTime, CASE WHEN appointment.Date IS NULL THEN 0 ELSE 1 END AS Taken
--                  FROM appointment RIGHT OUTER JOIN [3686ec8f-190e-4889-9eeb-a7500f777532] ON appointment.Date =  [3686ec8f-190e-4889-9eeb-a7500f777532].Date AND appointment.AssignedTo
--                  = [3686ec8f-190e-4889-9eeb-a7500f777532].userid AND appointment.StartTime =  [3686ec8f-190e-4889-9eeb-a7500f777532].StartTime AND appointment.EndTime = 
--                  [3686ec8f-190e-4889-9eeb-a7500f777532].EndTime) AS a  