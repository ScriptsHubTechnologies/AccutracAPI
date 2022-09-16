CREATE TABLE [dbo].[Roles] (
    [Company_Code] NCHAR (10)     NOT NULL,
    [RolesId]      NVARCHAR (50)  NOT NULL,
    [Name]         NVARCHAR (150) NOT NULL,
    [IsPrimary]    BIT            NOT NULL,
    [IsDeleted]    BIT            NOT NULL
);

