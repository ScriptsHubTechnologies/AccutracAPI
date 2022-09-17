CREATE TABLE [dbo].[Statements] (
    [company_code] NCHAR (10)         NULL,
    [Id]           INT                IDENTITY (1, 1) NOT NULL,
    [ProductId]    INT                NOT NULL,
    [Name]         NVARCHAR (255)     NOT NULL,
    [Terms]        NVARCHAR (MAX)     NOT NULL,
    [IsEditable]   BIT                NOT NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (255)     NULL,
    [UpdatedDate]  DATETIMEOFFSET (7) NULL,
    [UpdatedBy]    NVARCHAR (255)     NULL,
    [IsDeleted]    BIT                NOT NULL,
    [IsDefault]    BIT                NOT NULL
);

