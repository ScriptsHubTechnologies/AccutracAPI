CREATE TABLE [dbo].[UserGeoZones] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [AspNetUserId] NVARCHAR (450) NOT NULL,
    [GeoZoneId]    INT            NOT NULL
);

