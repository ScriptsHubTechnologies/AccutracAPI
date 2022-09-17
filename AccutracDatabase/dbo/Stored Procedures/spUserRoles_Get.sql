
Create procedure [dbo].[spUserRoles_Get]

@company_code nchar(10),
@userid nvarchar(50)

as 
begin
Select * from userroles where Company_Code=@company_code and userid=@userid and isdeleted =0
end