
Create procedure [dbo].[spUserRoles_Insert]

@company_code nchar(10),
@userid nvarchar(50),
@username nvarchar(100),
@roleid nvarchar(50),
@rolename nvarchar(100)

as 
begin
insert into userroles (Company_Code,userid,username,RolesId,RoleName,isdeleted) values (@company_code,@userid,@username,@roleid,@rolename,0)
end