
CREATE procedure [dbo].[spJobAddress_Get]
@JobAddressId int,
@Company_Code Nvarchar(10)

as 
begin
	Select JobAddressId, CustomerId, jobAddress1, jobAddress2, jobCity, jobState, jobZip from JobAddress where JobAddressId = @jobAddressId and ltrim(rtrim(Company_Code)) = @Company_Code 
end