CREATE TABLE [dbo].[Contract] (
    [company_code]      NCHAR (10)     NOT NULL,
    [contractId]        INT            IDENTITY (1, 1) NOT NULL,
    [proposalId]        NVARCHAR (50)  NOT NULL,
    [customerVisitId]   INT            NOT NULL,
    [AppointmentId]     INT            NOT NULL,
    [JobAddressId]      INT            NOT NULL,
    [CustomerId]        INT            NOT NULL,
    [LeadId]            INT            NOT NULL,
    [estimatorUserid]   NVARCHAR (50)  NOT NULL,
    [Estimator]         NVARCHAR (150) NOT NULL,
    [Total]             DECIMAL (18)   NOT NULL,
    [CommisionPaid]     DECIMAL (18)   NOT NULL,
    [Approved]          BIT            NOT NULL,
    [ApprovalDate]      DATE           NOT NULL,
    [Aprovedby]         NVARCHAR (50)  NOT NULL,
    [ProceedtoSchedule] BIT            NOT NULL
);

