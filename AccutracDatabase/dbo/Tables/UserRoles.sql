CREATE TABLE [dbo].[UserRoles] (
    [Company_Code] NCHAR (10)     NOT NULL,
    [UserRoleId]   INT            IDENTITY (1, 1) NOT NULL,
    [UserId]       NVARCHAR (450) NOT NULL,
    [UserName]     NVARCHAR (150) NOT NULL,
    [RolesId]      NVARCHAR (50)  NOT NULL,
    [RoleName]     NVARCHAR (150) NOT NULL,
    [IsDeleted]    BIT            NOT NULL
);

