
Create procedure [dbo].spGetLeadSubSource
@Id int

as 
begin
	SELECT        Id, Name FROM LeadSubSources WHERE (IsDeleted = 0) and LeadSourceId = @Id
end