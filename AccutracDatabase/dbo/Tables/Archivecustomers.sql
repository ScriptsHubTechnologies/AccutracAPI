CREATE TABLE [dbo].[Archivecustomers] (
    [Company_Code]     NVARCHAR (10)      NULL,
    [Customerid]       INT                IDENTITY (200000, 1) NOT NULL,
    [CustomerType]     INT                NULL,
    [CustomerTypeName] NVARCHAR (50)      NULL,
    [CompanyName]      NVARCHAR (50)      NULL,
    [FirstName]        NVARCHAR (100)     NULL,
    [LastName]         NVARCHAR (100)     NULL,
    [MailingAddress]   NVARCHAR (100)     NULL,
    [MailingAddress2]  NVARCHAR (100)     NULL,
    [MailingCity]      NVARCHAR (100)     NULL,
    [MailingState]     NCHAR (2)          NULL,
    [MailingZip]       INT                NULL,
    [Email]            NVARCHAR (50)      NULL,
    [Phone]            NVARCHAR (15)      NULL,
    [PhoneType]        NVARCHAR (50)      NULL,
    [CreatedBy]        NVARCHAR (50)      NULL,
    [CreatedDate]      DATETIMEOFFSET (7) NULL,
    [UpdatedBy]        NVARCHAR (50)      NULL,
    [UpdatedDate]      DATETIMEOFFSET (7) NULL,
    [Notes]            NVARCHAR (MAX)     NULL
);

