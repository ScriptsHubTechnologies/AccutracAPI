CREATE TABLE [dbo].[ArchiveEstSkills] (
    [Company_Code]        NVARCHAR (10)   NOT NULL,
    [UserId]              NVARCHAR (50)   NOT NULL,
    [Name]                NVARCHAR (50)   NOT NULL,
    [EmployeeCode]        NCHAR (10)      NOT NULL,
    [LeadType]            INT             NOT NULL,
    [LeadTypeName]        NVARCHAR (50)   NOT NULL,
    [AppointmentDuration] DECIMAL (18, 1) NOT NULL
);

