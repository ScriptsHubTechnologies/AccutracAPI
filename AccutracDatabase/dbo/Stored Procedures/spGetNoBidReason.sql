
create procedure [dbo].[spGetNoBidReason]

@Company_Code as Nvarchar(10)
as 
begin
SELECT company_code, NoBidId, Reason
FROM     NoBidReason
WHERE  (company_code = @company_code)
end