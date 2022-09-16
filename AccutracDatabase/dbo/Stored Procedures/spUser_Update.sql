-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spUser_Update]

@Company_Code as Nvarchar(50) =  '',
@UserId as Nvarchar(50) =  '',
@EmployeeId as Nvarchar(50) =  '',
@UserName as Nvarchar(50) =  '',
@Email as Nvarchar(50) =  '',
@Name as Nvarchar(50) =  '',
@UserRoleId as nvarchar(50) ='',
@UserRoleName as nvarchar(150)='',
@IsDeleted as bit ,
@IsActive as bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   
Update Users set Company_Code=@Company_Code,UserId=@UserId,EmployeeId=@EmployeeId,UserName=@UserName,Email=@Email,[Name]=@Name,UserRoleId=@UserRoleId,UserRoleName=@UserRoleName,IsDeleted=@IsDeleted,IsActive=@IsActive where
Company_Code=@Company_Code and UserId=@UserId;
end