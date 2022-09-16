CREATE TABLE [dbo].[ProposalStatement] (
    [Company_Code]      NCHAR (10)     NOT NULL,
    [ProposalId]        NVARCHAR (50)  NOT NULL,
    [ProjectId]         INT            NOT NULL,
    [ProjectTypeName]   NVARCHAR (50)  NOT NULL,
    [StatementId]       INT            NOT NULL,
    [StatementType]     INT            NOT NULL,
    [StatementTypeName] NVARCHAR (50)  NOT NULL,
    [Statement]         NVARCHAR (MAX) NOT NULL,
    [SortOrder]         INT            NOT NULL
);

