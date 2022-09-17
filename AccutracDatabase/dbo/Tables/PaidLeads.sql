CREATE TABLE [dbo].[PaidLeads] (
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]  NVARCHAR (50)  NOT NULL,
    [LastName]   NVARCHAR (50)  NOT NULL,
    [Address]    NVARCHAR (100) NOT NULL,
    [City]       NVARCHAR (50)  NOT NULL,
    [State]      NVARCHAR (50)  NOT NULL,
    [Zip]        NCHAR (10)     NOT NULL,
    [email]      NVARCHAR (50)  NULL,
    [project]    NVARCHAR (50)  NULL,
    [source]     NVARCHAR (50)  NOT NULL,
    [LeadId]     INT            NOT NULL,
    [recorded]   BIT            NULL,
    [recordedby] NVARCHAR (50)  NULL
);

