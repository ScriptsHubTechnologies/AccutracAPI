CREATE TABLE [dbo].[Zones] (
    [Id]           INT                IDENTITY (1, 1) NOT NULL,
    [Company_Code] NCHAR (10)         NULL,
    [Name]         NVARCHAR (150)     NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (255)     NULL,
    [UpdatedDate]  DATETIMEOFFSET (7) NULL,
    [UpdatedBy]    NVARCHAR (255)     NULL,
    [IsDeleted]    BIT                NOT NULL
);

