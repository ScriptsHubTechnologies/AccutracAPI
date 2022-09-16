
CREATE procedure [dbo].[spUserRoles_Update]

@company_code nchar(10),
@UserRoleId int,
@userid nvarchar(50),
@username nvarchar(100),
@roleid nvarchar(50),
@rolename nvarchar(100),
@isdeleted bit

as 
begin
update userroles set Company_Code=@company_code,userid=@userid,username=@username,RolesId=@roleid,RoleName=@rolename,isdeleted=@isdeleted where   UserRoleId=@UserRoleId
end