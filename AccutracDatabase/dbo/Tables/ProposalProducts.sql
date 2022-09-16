CREATE TABLE [dbo].[ProposalProducts] (
    [company_code]     NCHAR (10)     NOT NULL,
    [ProposalId]       NVARCHAR (50)  NOT NULL,
    [ProductId]        INT            NOT NULL,
    [ProductName]      NVARCHAR (150) NOT NULL,
    [ProjectTypeId]    INT            NOT NULL,
    [ProjectShortName] NCHAR (10)     NOT NULL,
    [ProjectName]      NVARCHAR (50)  NOT NULL,
    [SubCategory]      INT            NOT NULL,
    [SubCategoryName]  NVARCHAR (50)  NOT NULL,
    [UOM]              NVARCHAR (50)  NOT NULL,
    [Qty]              INT            NOT NULL,
    [CompanyPrice]     DECIMAL (18)   NOT NULL,
    [SalePrice]        DECIMAL (18)   NOT NULL,
    [SortOrder]        INT            NOT NULL,
    [IsRecommended]    BIT            NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [IX_ProposalDetails]
    ON [dbo].[ProposalProducts]([UOM] ASC);

