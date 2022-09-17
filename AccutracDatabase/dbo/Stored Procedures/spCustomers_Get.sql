
CREATE procedure [dbo].[spCustomers_Get]
@Id int,
@CC nchar(10),
@LastName nvarchar(50),
@JobAddress nvarchar(50)

as 
begin
if (@id ='') set @id=null
SELECT Customers.Company_Code, Customers.Customerid, JobAddress.JobAddressId, Customers.CustomerType, Customers.CreatedDate ,Customers.CustomerTypeName, Customers.FirstName, Customers.LastName, 
                  JobAddress.JobAddress1, JobAddress.JobAddress2, JobAddress.JobCity, JobAddress.JobState, JobAddress.JobZip, Customers.MailingAddress, Customers.MailingAddress2, Customers.MailingCity, Customers.MailingState, 
                  Customers.MailingZip, Customers.Email, Customers.Phone, Customers.PhoneType
FROM     Customers Inner JOIN
                  JobAddress ON Customers.Customerid = JobAddress.CustomerId AND Customers.Company_Code = JobAddress.Company_Code
WHERE  (Customers.Customerid = COALESCE (@id, Customers.Customerid)) AND (Customers.LastName LIKE N'%' + @LastName + N'%') AND (Jobaddress.JobAddress1  LIKE N'%' + @JobAddress + N'%') AND (Customers.Company_Code = @cc)
end