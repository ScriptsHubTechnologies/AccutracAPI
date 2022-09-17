CREATE TABLE [dbo].[EstimatorLocations] (
    [Company_Code]       NCHAR (10)     NULL,
    [Name]               NVARCHAR (MAX) NULL,
    [UserId]             NVARCHAR (450) NOT NULL,
    [SpectrumEmployeeId] NVARCHAR (255) NOT NULL,
    [RoleName]           NVARCHAR (256) NULL,
    [Address1]           NVARCHAR (255) NOT NULL,
    [City]               NVARCHAR (150) NULL,
    [State]              NVARCHAR (25)  NULL,
    [Zip]                NVARCHAR (50)  NULL
);

