
create procedure [dbo].[spGetRoles]

@company_code nchar(10),
@desc nvarchar(50)

as 
begin

SELECT        Company_Code, RolesId, Name, IsPrimary, IsDeleted
FROM            Roles WHERE   (Name LIKE N'%' + @desc + N'%') AND (Company_Code = @company_code);

end