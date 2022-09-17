CREATE TABLE [dbo].[Attachments] (
    [AttachmentId]   INT            IDENTITY (1, 1) NOT NULL,
    [Company_Code]   NCHAR (10)     NOT NULL,
    [CustomerId]     INT            NOT NULL,
    [JobAddressId]   INT            NOT NULL,
    [FunctionTable]  NVARCHAR (50)  NULL,
    [FunctionId]     INT            NULL,
    [AttachmentType] NVARCHAR (50)  NOT NULL,
    [AttachmentName] NVARCHAR (150) NOT NULL,
    [AttachmentPath] NVARCHAR (250) NOT NULL
);

