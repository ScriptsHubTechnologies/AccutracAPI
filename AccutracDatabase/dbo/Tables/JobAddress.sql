CREATE TABLE [dbo].[JobAddress] (
    [JobAddressId] INT                IDENTITY (1, 1) NOT NULL,
    [CustomerId]   INT                NOT NULL,
    [Company_Code] NVARCHAR (10)      NOT NULL,
    [JobAddress1]  NVARCHAR (100)     NOT NULL,
    [JobAddress2]  NVARCHAR (100)     NULL,
    [JobCity]      NVARCHAR (50)      NOT NULL,
    [jobState]     NVARCHAR (25)      NULL,
    [jobZip]       NVARCHAR (50)      NULL,
    [ZoneId]       INT                NOT NULL,
    [ZoneName]     NVARCHAR (150)     NULL,
    [GeoZoneId]    INT                NOT NULL,
    [GeoZoneName]  NVARCHAR (150)     NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (50)      NULL,
    [UpdatedDate]  DATETIMEOFFSET (7) NULL,
    [UpdatedBy]    NVARCHAR (50)      NULL,
    [IsDeleted]    BIT                NULL
);


GO
CREATE NONCLUSTERED INDEX [Ix_tblJobAddresses_JobZip]
    ON [dbo].[JobAddress]([jobZip] ASC)
    INCLUDE([JobAddressId], [CustomerId], [Company_Code], [JobAddress1], [JobAddress2], [JobCity], [jobState], [ZoneId], [ZoneName], [GeoZoneId], [GeoZoneName], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy], [IsDeleted]);


GO
CREATE NONCLUSTERED INDEX [idx_JobAddress_GeoZone]
    ON [dbo].[JobAddress]([GeoZoneId] ASC)
    INCLUDE([JobAddressId], [CustomerId], [Company_Code], [JobAddress1], [JobAddress2], [JobCity], [jobState], [jobZip], [ZoneId], [ZoneName], [GeoZoneName], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy], [IsDeleted]);

