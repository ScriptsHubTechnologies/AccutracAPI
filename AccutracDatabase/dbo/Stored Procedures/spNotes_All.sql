
CREATE procedure [dbo].[spNotes_All]
@CustomerId nvarchar(50),
@Company_Code Nvarchar(10),
@JobAddressId nvarchar(50)

as 
begin
if (@customerid is null or @customerid='') set @CustomerId='%'
if (@JobAddressId is null or @JobAddressId='') set @JobAddressId='%'
	SELECT NoteId, Company_Code, JobAddressId, CustomerId, Id, IdTypeName, Note FROM Notes where company_code=@Company_Code and CustomerId like @CustomerId  and JobAddressId like @JobAddressId 
ORDER BY Note
end