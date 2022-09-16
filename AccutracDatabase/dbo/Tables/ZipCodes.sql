CREATE TABLE [dbo].[ZipCodes] (
    [Id]           INT                IDENTITY (1, 1) NOT NULL,
    [Company_Code] NCHAR (10)         NULL,
    [GeoZoneId]    INT                NOT NULL,
    [Zip]          NVARCHAR (50)      NULL,
    [City]         NVARCHAR (150)     NULL,
    [County]       NVARCHAR (150)     NULL,
    [State]        NVARCHAR (25)      NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (255)     NULL,
    [UpdatedDate]  DATETIMEOFFSET (7) NULL,
    [UpdatedBy]    NVARCHAR (255)     NULL,
    [IsDeleted]    BIT                NOT NULL
);

