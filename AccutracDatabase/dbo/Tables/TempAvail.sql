CREATE TABLE [dbo].[TempAvail] (
    [Date]      DATE          NOT NULL,
    [Employee]  NVARCHAR (50) NOT NULL,
    [StartTime] TIME (7)      NOT NULL,
    [EndTime]   TIME (7)      NOT NULL,
    [userid]    NVARCHAR (50) NOT NULL
);

