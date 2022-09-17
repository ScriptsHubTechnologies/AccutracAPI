CREATE TABLE [dbo].[LeadSources] (
    [Id]          INT                IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255)     NOT NULL,
    [CreatedDate] DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]   NVARCHAR (255)     NULL,
    [UpdatedDate] DATETIMEOFFSET (7) NULL,
    [UpdatedBy]   NVARCHAR (255)     NULL,
    [IsDeleted]   BIT                NOT NULL
);

