
CREATE procedure [dbo].[spGetNotesbyJobAddressId]

@Company_Code as Nvarchar(50) =  '',

@JobAddress as int




as 
begin
SELECT Company_Code, NoteId, CustomerId, JobAddress, Lead, Appointment, Proposal, Project, DateTime, Text, NoteType, ReferenceTo, CreatedDate, CreatedBy
FROM     Notes
WHERE  (Company_Code = @company_code) AND (JobAddress = @jobaddress)
	end

