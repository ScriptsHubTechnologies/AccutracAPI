CREATE TABLE [dbo].[Appointment] (
    [Company_Code]        NVARCHAR (10)      NOT NULL,
    [AppointmentId]       INT                IDENTITY (1, 1) NOT NULL,
    [CustomerId]          INT                NOT NULL,
    [LeadId]              INT                NOT NULL,
    [JobAddressId]        INT                NULL,
    [AppointmentType]     INT                NOT NULL,
    [AppointmentTypeName] NVARCHAR (50)      NOT NULL,
    [Status]              INT                NULL,
    [StatusName]          NVARCHAR (50)      NULL,
    [CreatedDate]         DATETIMEOFFSET (7) NOT NULL,
    [CreatedBy]           NVARCHAR (255)     NOT NULL,
    [AssignedTo]          NVARCHAR (50)      NOT NULL,
    [AssignedName]        NVARCHAR (MAX)     NOT NULL,
    [Date]                NVARCHAR (10)      NOT NULL,
    [StartTime]           NVARCHAR (50)      NOT NULL,
    [EndTime]             NVARCHAR (50)      NOT NULL,
    [DeleteReason]        NVARCHAR (MAX)     NOT NULL,
    [UpdatedDate]         DATETIMEOFFSET (7) NULL,
    [UpdatedBy]           NVARCHAR (50)      NULL,
    [IsDeleted]           BIT                NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [idx-Appointment-AssignedTo]
    ON [dbo].[Appointment]([AppointmentId] ASC)
    INCLUDE([AssignedTo]);

