CREATE TABLE [dbo].[JobAddresses] (
    [JobAddressId] INT                NOT NULL,
    [CustomerId]   INT                NOT NULL,
    [Company_Code] NVARCHAR (10)      NOT NULL,
    [CreatedDate]  DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]    NVARCHAR (50)      NULL,
    [UpdatedDate]  DATETIMEOFFSET (7) NULL,
    [UpdatedBy]    NVARCHAR (50)      NULL,
    [JobAddress]   NVARCHAR (429)     NULL,
    [JobAddress1]  NVARCHAR (100)     NOT NULL,
    [JobAddress2]  NVARCHAR (100)     NULL,
    [City]         NVARCHAR (150)     NULL,
    [State]        NVARCHAR (25)      NULL,
    [Zip]          NVARCHAR (50)      NULL
);

