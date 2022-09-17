
create procedure [dbo].spEstAvailSkillData_Delete

@Company_Code nchar(10),
@uniqueid nvarchar(50)


as 
begin

delete FROM     EstSkillAvail 
WHERE        (Company_Code = @company_code) AND (uniqueid = @uniqueid )
end