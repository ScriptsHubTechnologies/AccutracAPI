CREATE TABLE [dbo].[Notesold] (
    [NoteId]       INT            IDENTITY (1, 1) NOT NULL,
    [Company_Code] NCHAR (10)     NOT NULL,
    [JobAddressId] INT            NOT NULL,
    [CustomerId]   INT            NOT NULL,
    [Id]           INT            NOT NULL,
    [IdTypeName]   NVARCHAR (50)  NOT NULL,
    [Note]         NVARCHAR (MAX) NOT NULL
);

