CREATE TABLE [dbo].[LeadType] (
    [id]           INT           IDENTITY (1, 1) NOT NULL,
    [LeadTypeName] NVARCHAR (50) NOT NULL,
    [LeadType]     INT           NULL,
    [Company_Code] NVARCHAR (10) NULL
);

