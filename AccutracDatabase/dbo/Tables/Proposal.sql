CREATE TABLE [dbo].[Proposal] (
    [company_code]       NCHAR (10)         NOT NULL,
    [ProposalId]         NVARCHAR (50)      NOT NULL,
    [CustomerId]         INT                NOT NULL,
    [LeadId]             INT                NOT NULL,
    [JobAddressId]       NVARCHAR (50)      NOT NULL,
    [AppointmentId]      NVARCHAR (50)      NOT NULL,
    [CustomerVisitId]    NVARCHAR (50)      NOT NULL,
    [status]             INT                NOT NULL,
    [ProposalStatusName] NVARCHAR (50)      NOT NULL,
    [IsGenerated]        BIT                NOT NULL,
    [Total]              DECIMAL (18)       NULL,
    [Discount]           DECIMAL (18)       NULL,
    [AssignedTo]         NVARCHAR (50)      NULL,
    [AssignedName]       NVARCHAR (100)     NULL,
    [discountPercentage] DECIMAL (18, 2)    NULL,
    [discountedTotal]    DECIMAL (18)       NULL,
    [createdBy]          NVARCHAR (100)     NULL,
    [createdDate]        DATETIMEOFFSET (7) NULL
);

