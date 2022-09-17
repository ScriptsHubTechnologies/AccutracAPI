
CREATE procedure [dbo].[spGetProposalStatements]

@company_code nchar(10),
@proposalid nvarchar(50)

as 
begin

SELECT Proposal.company_code, Proposal.ProposalId, Proposal.CustomerId, Proposal.LeadId, Proposal.JobAddressId, Proposal.AppointmentId, Proposal.CustomerVisitId, Proposal.status, Proposal.ProposalStatusName, Proposal.IsGenerated, 
                  Proposal.Total, Proposal.Discount, ProposalStatement.StatementId, ProposalStatement.StatementType, ProposalStatement.StatementTypeName, ProposalStatement.Statement, ProposalStatement.SortOrder, 
                  ProposalStatement.ProjectTypeName
FROM     Proposal INNER JOIN
                  ProposalStatement ON Proposal.company_code = ProposalStatement.Company_Code AND Proposal.ProposalId = ProposalStatement.ProposalId
WHERE  (Proposal.company_code = @company_code) AND (Proposal.ProposalId = @proposalid);

end