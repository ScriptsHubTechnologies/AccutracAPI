CREATE TABLE [dbo].[Users] (
    [Company_Code] NCHAR (10)     NOT NULL,
    [UserId]       NVARCHAR (50)  NOT NULL,
    [EmployeeId]   NVARCHAR (10)  NOT NULL,
    [UserName]     NVARCHAR (150) NOT NULL,
    [Email]        NVARCHAR (150) NOT NULL,
    [Name]         NVARCHAR (150) NOT NULL,
    [UserRoleId]   NVARCHAR (450) NOT NULL,
    [UserRoleName] NVARCHAR (150) NOT NULL,
    [IsDeleted]    BIT            NOT NULL,
    [isActive]     BIT            NOT NULL
);

