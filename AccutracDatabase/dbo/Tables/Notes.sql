CREATE TABLE [dbo].[Notes] (
    [Company_Code] NVARCHAR (50)      NOT NULL,
    [NoteId]       INT                IDENTITY (1, 1) NOT NULL,
    [CustomerId]   NVARCHAR (50)      NOT NULL,
    [JobAddress]   NVARCHAR (50)      NULL,
    [Lead]         NVARCHAR (50)      NULL,
    [Appointment]  NVARCHAR (50)      NULL,
    [Proposal]     NVARCHAR (50)      NULL,
    [Project]      NVARCHAR (50)      NULL,
    [DateTime]     DATETIMEOFFSET (7) NOT NULL,
    [Text]         NVARCHAR (MAX)     NOT NULL,
    [NoteType]     NVARCHAR (50)      NULL,
    [ReferenceTo]  NVARCHAR (50)      NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (150)     NOT NULL
);

