
Create procedure [dbo].[spLeadSources_GetAll]


as 
begin
	SELECT Id, Name FROM LeadSources where IsDeleted =0
end