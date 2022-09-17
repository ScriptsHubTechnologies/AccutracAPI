CREATE PROCEDURE [dbo].[spAttachment_GetByCompany]
	@jobid NVARCHAR(50),
	@custid NVARCHAR(50),
	@company_code NVARCHAR(50)

AS 
BEGIN

	SELECT * FROM Attachments WHERE Company_Code = @company_code and CustomerId = @custid and JobAddressId = @jobid

END
