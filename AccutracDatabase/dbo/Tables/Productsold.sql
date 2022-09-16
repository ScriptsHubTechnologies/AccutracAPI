CREATE TABLE [dbo].[Productsold] (
    [Company_Code]     NCHAR (10)     NOT NULL,
    [ProductId]        INT            NOT NULL,
    [ProductName]      NVARCHAR (150) NOT NULL,
    [ProjectShortName] NVARCHAR (50)  NOT NULL,
    [ProjectName]      NVARCHAR (150) NOT NULL,
    [ProjectTypeId]    INT            NOT NULL,
    [SubCategory]      INT            NOT NULL,
    [SubCategoryName]  NVARCHAR (50)  NOT NULL,
    [UOM]              NVARCHAR (50)  NOT NULL,
    [Qty]              INT            NOT NULL,
    [CompanyPrice]     DECIMAL (18)   NOT NULL,
    [SalePrice]        DECIMAL (18)   NOT NULL
);

