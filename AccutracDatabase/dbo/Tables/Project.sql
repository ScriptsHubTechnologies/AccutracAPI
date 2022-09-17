CREATE TABLE [dbo].[Project] (
    [company_code]      NCHAR (10)     NOT NULL,
    [projectId]         INT            IDENTITY (1, 1) NOT NULL,
    [contractId]        INT            NOT NULL,
    [proposalId]        NVARCHAR (50)  NOT NULL,
    [customerId]        INT            NOT NULL,
    [jobaddressId]      INT            NOT NULL,
    [estimatorUserId]   INT            NOT NULL,
    [estimator]         NVARCHAR (150) NOT NULL,
    [projectTypeId]     INT            NOT NULL,
    [projectTypeName]   NVARCHAR (150) NOT NULL,
    [Status]            INT            NOT NULL,
    [projectStatusName] NVARCHAR (50)  NOT NULL,
    [IsCancelled]       BIT            NOT NULL,
    [Total]             DECIMAL (18)   NOT NULL,
    [CommissionPaid]    DECIMAL (18)   NOT NULL,
    [createdDate]       DATE           NOT NULL,
    [createdBy]         NVARCHAR (150) NOT NULL
);

