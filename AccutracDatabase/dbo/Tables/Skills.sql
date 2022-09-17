CREATE TABLE [dbo].[Skills] (
    [aspNetUserId]        NVARCHAR (50)   NOT NULL,
    [Employee]            NVARCHAR (MAX)  NULL,
    [Email]               NVARCHAR (256)  NULL,
    [ProjectType]         INT             NOT NULL,
    [SpectrumEmployeeId]  NVARCHAR (255)  NOT NULL,
    [Long_Desc]           NVARCHAR (100)  NOT NULL,
    [LeadType]            INT             NULL,
    [AppointmentDuration] DECIMAL (18, 1) NULL
);

