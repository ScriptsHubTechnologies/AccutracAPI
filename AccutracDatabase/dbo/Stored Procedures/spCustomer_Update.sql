-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spCustomer_Update]
@CustomerId as int ,
@Company_Code as Nvarchar(50) =  '',
@CustomerType as Nvarchar(50) =  '',
@FirstName as Nvarchar(50) =  '',
@LastName as Nvarchar(50) =  '',
@MailingAddress as Nvarchar(50) =  '',
@MailingAddress2 as Nvarchar(50) =  '',
@MailingCity as Nvarchar(50) =  '',
@MailingState as Nvarchar(50) =  '',
@MailingZip as Nvarchar(50) =  '',
@Email as Nvarchar(50) =  '',
@Phone as Nvarchar(50) =  '',
@PhoneType as Nvarchar(50) =  '',
@CreatedBy as Nvarchar(50) =  '',
@CreatedDate as Nvarchar(50) =  '',
@UpdatedBy as Nvarchar(50) =  '',
@UpdatedDate as Nvarchar(50) =  '',
@Notes as Nvarchar(50) =  '',
@UserDefinedstr1 as Nvarchar(50) =  '',
@UserDefinedint1 as Nvarchar(50) =  '',
@UserDefinedstr2 as Nvarchar(50) =  '',
@UserDefinedInt2 as Nvarchar(50) =  '',
@UserDefinedstr3 as Nvarchar(50) =  '',
@Userdefinedint3 as Nvarchar(50) =  ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   UPDATE       Customers
SET                Company_Code = @Company_Code, CustomerType = @CustomerType, FirstName = @FirstName, LastName = @LastName, MailingAddress = @MailingAddress, MailingAddress2 = @MailingAddress2, 
                         MailingCity = @MailingCity, MailingState = @MailingState, MailingZip = @MailingZip, Email = @Email, Phone = @Phone, PhoneType = @PhoneType, CreatedBy = @CreatedBy, CreatedDate = @CreatedDate, 
                         UpdatedBy = @UpdatedBy, UpdatedDate = @UpdatedDate, Notes = @Notes, UserDefinedstr1 = @UserDefinedstr1, UserDefinedint1 = @UserDefinedint1, UserDefinedstr2 = @UserDefinedstr2, 
                         UserDefinedInt2 = @UserDefinedInt2, UserDefinedstr3 = @UserDefinedstr3, Userdefinedint3 = @Userdefinedint3
WHERE        (CustomerId = @CustomerId)
END
