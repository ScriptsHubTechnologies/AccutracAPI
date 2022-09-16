-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spGetStatements]
 @Company_Code nvarchar(10),
	@proposalid nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT DISTINCT 
                  ProposalProducts.company_code, ProposalProducts.ProposalId, ProposalProducts.ProjectTypeId AS ProjectId, ProposalProducts.ProjectName AS ProjectTypeName, Statements.Id AS StatementId, 
                  Statements.Name AS StatementTypeName, Statements.Terms AS Statement, Statements.IsDefault, Statements.IsEditable
FROM     Statements INNER JOIN
                  ProposalProducts ON Statements.ProductId = ProposalProducts.ProductId AND Statements.company_code = ProposalProducts.company_code
WHERE  (Statements.IsDeleted = 0) AND (ProposalProducts.ProposalId = @proposalid) AND (ProposalProducts.company_code = @Company_Code) ;
END
