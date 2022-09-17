-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spUser_Insert]

@Company_Code as Nvarchar(50) =  '',
@UserId as Nvarchar(50) =  '',
@EmployeeId as Nvarchar(50) =  '',
@UserName as Nvarchar(50) =  '',
@Email as Nvarchar(50) =  '',
@Name as Nvarchar(50) =  '',
@UserRoleId as nvarchar(50),
@UserRoleName as nvarchar(150),
@IsDeleted as bit ,
@IsActive as bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   
Insert into Users (Company_Code,UserId,EmployeeId,UserName,Email,[Name],UserRoleId, UserRoleName,IsDeleted,IsActive) values (@Company_Code,@UserId,@EmployeeId,@UserName,@Email,@Name,@UserRoleId, @UserRoleName,@IsDeleted,@IsActive);
END
