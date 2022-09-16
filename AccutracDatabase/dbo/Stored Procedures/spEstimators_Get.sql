
CREATE procedure [dbo].[spEstimators_Get]

@company_code nchar(10)


as 
begin
Select userid,username from userroles where Company_Code=@company_code and rolesid='3b20d3df-3ef7-42cd-81ca-cd7820b98e6a' and isdeleted =0
end