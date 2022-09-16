CREATE TABLE [dbo].[UpdateLog] (
    [id]                   INT                IDENTITY (1, 1) NOT NULL,
    [CompanyCode]          NCHAR (10)         NOT NULL,
    [UparteDate]           DATETIMEOFFSET (7) NOT NULL,
    [UpdatedBy]            NVARCHAR (50)      NOT NULL,
    [OnTable]              NVARCHAR (50)      NOT NULL,
    [OriginalRecordString] NVARCHAR (MAX)     NOT NULL,
    [UpdateedRecordString] NVARCHAR (MAX)     NOT NULL
);

