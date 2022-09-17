CREATE procedure [dbo].[spLeads_GetCount]
@company_code nvarchar(10)

as 
begin
SELECT Company_Code, (Pending +Unscheduled+ Reshedule+ ApprovedDeadLead) as Total,Pending, Unscheduled, Reshedule, ApprovedDeadLead FROM (SELECT Company_Code, COUNT(CASE WHEN status = 0 THEN 1 ELSE NULL END) AS Pending, COUNT(CASE WHEN status = 1 THEN 1 ELSE null END) AS Unscheduled, COUNT(CASE WHEN status = 2 THEN 1 ELSE NULL END) AS Reshedule, COUNT(CASE WHEN status = 3 THEN 1 ELSE NULL END) AS ApprovedDeadLead FROM            Leads WHERE (NOT EXISTS (SELECT LeadId FROM Appointment WHERE (Leads.LeadId = LeadId) AND (IsDeleted = 0))) GROUP BY Company_Code) AS c WHERE (ltrim(rtrim(Company_Code)) = @company_code)

end

