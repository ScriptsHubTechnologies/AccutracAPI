CREATE TABLE [dbo].[Availabilities] (
    [Id]           INT                NOT NULL,
    [AspNetUserId] NVARCHAR (450)     NOT NULL,
    [wkDay]        INT                NOT NULL,
    [StartTime]    TIME (7)           NOT NULL,
    [EndTime]      TIME (7)           NOT NULL,
    [StartDate]    DATE               NOT NULL,
    [EndDate]      DATE               NOT NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (255)     NULL,
    [IsDeleted]    BIT                NOT NULL,
    [Address1]     NVARCHAR (255)     NOT NULL,
    [City]         NVARCHAR (150)     NULL,
    [State]        NVARCHAR (25)      NULL,
    [Zip]          NVARCHAR (50)      NULL
);

