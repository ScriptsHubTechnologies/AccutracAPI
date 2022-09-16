
create procedure [dbo].spEstLeadType
@company_code nvarchar(10),
@userid nchar(50)
as 
begin
SELECT  Company_Code, WkDayNumber, WkDayName, StartDate,  LeadType, LeadTypeName
FROM     EstSkillAvail
WHERE  (Company_Code = @company_code) AND (UserId =@userid)
GROUP BY  Company_Code, WkDayName, WkDayNumber, StartDate,  LeadType, LeadTypeName 
end