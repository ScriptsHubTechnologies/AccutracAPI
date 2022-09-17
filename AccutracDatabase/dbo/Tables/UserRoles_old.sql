CREATE TABLE [dbo].[UserRoles_old] (
    [Company_Code] NVARCHAR (50)  NOT NULL,
    [UserId]       NVARCHAR (450) NOT NULL,
    [RoleId]       NVARCHAR (450) NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [idx_UserRoles]
    ON [dbo].[UserRoles_old]([UserId] ASC)
    INCLUDE([Company_Code], [RoleId]);

