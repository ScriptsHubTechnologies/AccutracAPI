CREATE TABLE [dbo].[CustomerVisit] (
    [Company_Code]        NCHAR (10)     NOT NULL,
    [CustomerVisitId]     INT            IDENTITY (1, 1) NOT NULL,
    [CustomerId]          INT            NOT NULL,
    [JobAddressId]        INT            NOT NULL,
    [AppointmentId]       INT            NOT NULL,
    [LeadId]              INT            NOT NULL,
    [AppointmentType]     INT            NOT NULL,
    [AppointmentTypeName] NVARCHAR (50)  NOT NULL,
    [CreatedDate]         DATE           NOT NULL,
    [CreatedBy]           NVARCHAR (50)  NOT NULL,
    [Status]              INT            NOT NULL,
    [statusName]          NVARCHAR (150) NOT NULL,
    [Checklist]           NVARCHAR (MAX) NULL,
    [Walkthrough]         NVARCHAR (MAX) NULL,
    [Reason]              NVARCHAR (MAX) NULL,
    [AssignedTo]          NVARCHAR (50)  NOT NULL,
    [AssignedName]        NVARCHAR (100) NOT NULL
);

