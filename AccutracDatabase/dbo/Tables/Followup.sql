CREATE TABLE [dbo].[Followup] (
    [company_code]    NVARCHAR (10)      NOT NULL,
    [FollowupId]      INT                NOT NULL,
    [CustomerVisitId] INT                NOT NULL,
    [AppointmentId]   INT                NOT NULL,
    [LeadId]          INT                NOT NULL,
    [JobAddressId]    INT                NOT NULL,
    [CustomerId]      INT                NOT NULL,
    [FollowupDate]    DATETIMEOFFSET (7) NOT NULL,
    [Note]            NVARCHAR (MAX)     NULL,
    [CreatedDate]     DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]       NVARCHAR (150)     NOT NULL,
    [Userid]          NVARCHAR (50)      NOT NULL,
    [IsCompleted]     BIT                NOT NULL
);

