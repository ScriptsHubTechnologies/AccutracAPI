
Create procedure [dbo].[spGetFunctionStatus]

@Company_Code as Nvarchar(10),
@Functionid as int
as 
begin
	SELECT FunctionId, FunctionIdName, StatusId, StatusIdName
FROM     Status
WHERE  (Company_Code = @company_code) AND (FunctionId = @functionid)
end