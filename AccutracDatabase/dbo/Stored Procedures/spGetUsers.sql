
CREATE procedure [dbo].[spGetUsers]
@UserId nvarchar(50),
@company_code nchar(10),
@name nvarchar(50)

as 
begin

if (@UserId ='') set @UserId=null
--SELECT  distinct      Company_Code, UserId, EmployeeId, UserName, Email, Name
--FROM            Users WHERE  (UserId= COALESCE (@UserId, UserId)) AND (Name LIKE N'%' + @name + N'%') AND (Company_Code = @company_code) and isdeleted =0 and isactive =1 order by userid
SELECT DISTINCT Users.Company_Code, Users.UserId, Users.EmployeeId, Users.UserName, Users.Email, Users.Name, UserRoles.RoleName, UserRoles.RolesId, Users.isActive
FROM     Users INNER JOIN
                  UserRoles ON Users.Company_Code = UserRoles.Company_Code AND Users.UserId = UserRoles.UserId
WHERE  (Users.UserId = COALESCE (@UserId, Users.UserId)) AND (Users.Name LIKE N'%' + @name + N'%') AND (Users.Company_Code = @company_code) AND (Users.IsDeleted = 0) AND (Users.isActive = 1)
ORDER BY Users.UserId
end