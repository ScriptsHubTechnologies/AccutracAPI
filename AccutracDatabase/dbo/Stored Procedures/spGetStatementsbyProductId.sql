-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[spGetStatementsbyProductId]
 @Company_Code nvarchar(10),
	@productid int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT DISTINCT company_code, Id AS StatementId, Name AS StatementTypeName, Terms AS Statement, IsDefault, ProductId, IsEditable
FROM     Statements
WHERE  (IsDeleted = 0) AND (ProductId = @productid) AND (company_code = @company_code)  ;
END
