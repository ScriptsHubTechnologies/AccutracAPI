
CREATE procedure [dbo].[spProposalProduct_GetbyId]

@company_code nchar(10),
@proposalId nvarchar(50)

as 
begin

SELECT Company_Code,ProjectId, ProposalId, ProjectTypeId, ProjectTypeName, ProductId, ProductName, ListPrice, SalePrice, Qty, ItemTypeId, ItemTypeDesc, SortOrder
FROM     ProposalDetails
WHERE  (company_code = @company_code) and ProposalId=@proposalId ;

end