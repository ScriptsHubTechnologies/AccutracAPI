CREATE TABLE [dbo].[ArchiveEstSkillAvail] (
    [id]                  INT             IDENTITY (1, 1) NOT NULL,
    [Company_Code]        NVARCHAR (10)   NOT NULL,
    [UserId]              NVARCHAR (50)   NOT NULL,
    [Name]                NVARCHAR (50)   NOT NULL,
    [WkDayNumber]         INT             NOT NULL,
    [WkDayName]           NCHAR (15)      NOT NULL,
    [StartDate]           DATE            NOT NULL,
    [StartTime]           TIME (7)        NOT NULL,
    [EndTime]             TIME (7)        NOT NULL,
    [StartLocation]       NVARCHAR (150)  NOT NULL,
    [IsDeleted]           BIT             NOT NULL,
    [Createdby]           NVARCHAR (50)   NOT NULL,
    [CreatedDate]         DATE            NOT NULL,
    [EmployeeCode]        NCHAR (10)      NOT NULL,
    [LeadType]            INT             NULL,
    [AppointmentDuration] DECIMAL (18, 1) NOT NULL,
    [GeoZoneId]           INT             NULL,
    [uniqueid]            NVARCHAR (50)   NULL
);

