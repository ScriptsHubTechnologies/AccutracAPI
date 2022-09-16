
CREATE procedure [dbo].[spGetProposalProducts]

@company_code nchar(10),
@proposalid nvarchar(50)

as 
begin

SELECT Proposal.company_code, Proposal.ProposalId, Proposal.CustomerId, Proposal.LeadId, Proposal.JobAddressId, Proposal.AppointmentId, Proposal.CustomerVisitId, Proposal.status, Proposal.ProposalStatusName, 
                  Proposal.IsGenerated, Proposal.Total, Proposal.Discount, ProposalProducts.ProductId, ProposalProducts.ProductName, ProposalProducts.ProjectTypeId, ProposalProducts.ProjectShortName, ProposalProducts.ProjectName, 
                  ProposalProducts.SubCategory, ProposalProducts.SubCategoryName, ProposalProducts.UOM, ProposalProducts.Qty, ProposalProducts.CompanyPrice, ProposalProducts.SalePrice, ProposalProducts.SortOrder, 
                  ProposalProducts.IsRecommended
FROM     Proposal INNER JOIN
                  ProposalProducts ON Proposal.company_code = ProposalProducts.company_code AND Proposal.ProposalId = ProposalProducts.ProposalId
WHERE  (Proposal.company_code = @company_code) AND (Proposal.ProposalId = @proposalid);

end