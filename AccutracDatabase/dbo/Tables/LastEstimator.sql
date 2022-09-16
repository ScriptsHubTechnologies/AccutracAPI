CREATE TABLE [dbo].[LastEstimator] (
    [Company_Code]   NVARCHAR (10)  NOT NULL,
    [JobAddressId]   INT            NOT NULL,
    [AssignedToId]   NVARCHAR (50)  NULL,
    [AssignedToName] NVARCHAR (MAX) NULL,
    [Date]           NVARCHAR (10)  NULL
);

