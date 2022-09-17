
create procedure [dbo].spEstLeadType
@company_code nvarchar(10),
@userid nchar(50)
as 
begin
SELECT  ESA.Company_Code, WkDayNumber, WkDayName, StartDate,  ESA.LeadType, LT.LeadTypeName
FROM     EstSkillAvail ESA
JOIN LeadType LT ON LT.LeadType = ESA.LeadType
WHERE  (ESA.Company_Code = @company_code) AND (UserId =@userid)
GROUP BY  ESA.Company_Code, WkDayName, WkDayNumber, StartDate,  ESA.LeadType, LeadTypeName 
end