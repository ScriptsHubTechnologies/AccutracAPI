CREATE TABLE [dbo].[NoBidReason] (
    [company_code] NCHAR (10)     NULL,
    [NoBidId]      INT            IDENTITY (1, 1) NOT NULL,
    [Reason]       NVARCHAR (150) NOT NULL
);

