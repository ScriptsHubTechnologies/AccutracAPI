-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spGet_JobAddressInfo]
 @Company_Code nvarchar(10),
	@JobAddressId nvarchar(50), 
	@custid nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@custid is null or @custid='') set @custid='%'
if (@JobAddressId is null or @JobAddressId='') set @JobAddressId='%'
  SELECT        Customers.Company_Code, JobAddress.JobAddressId, Customers.Customerid, UPPER(Customers.FirstName) + ' ' + UPPER(Customers.LastName) AS Customer, 
                         JobAddress.JobAddress1 + ' ' + CASE WHEN JobAddress.JobAddress2 IS NULL THEN '' ELSE JobAddress.JobAddress2 END AS JobAddress, JobAddress.JobCity, JobAddress.jobState, JobAddress.jobZip, 
                         Customers.MailingAddress + ' ' + CASE WHEN Customers.MailingAddress2 IS NULL THEN '' ELSE Customers.MailingAddress2 END AS MailingAddress, Customers.MailingCity, Customers.MailingState, Customers.MailingZip, 
                         Customers.Email, Customers.Phone, JobAddress.ZoneId, JobAddress.ZoneName, JobAddress.GeoZoneId, JobAddress.GeoZoneName
FROM            Customers INNER JOIN
                         JobAddress ON Customers.Customerid = JobAddress.CustomerId AND Customers.Company_Code = JobAddress.Company_Code where Customers.Company_Code=@Company_Code and JobAddress.JobAddressId like @JobAddressId and Customers.Customerid like @custid ;
END
