
Create procedure [dbo].[spProposalItemType_GetAll]

@company_code nchar(10)

as 
begin

SELECT ItemTypeId, ItemTypeName, AreaId, AreaName, company_code
FROM     ProposalItemType
WHERE  (company_code = @company_code) ;

end