
CREATE procedure [dbo].[spJobAddress_GetId]
@jobaddressid nvarchar(50),
@company_code nvarchar(10)


as 
begin
	select * from dbo.JobAddress where JobAddressId =@jobaddressid and Company_Code=@company_code ;
end