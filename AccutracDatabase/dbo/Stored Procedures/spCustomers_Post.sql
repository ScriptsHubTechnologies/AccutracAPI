
CREATE procedure [dbo].[spCustomers_Post]

@Company_Code as Nvarchar(50) =  '',
@CustomerId as int output,
@CustomerType as Nvarchar(50) =  '',
@CompanyName as Nvarchar(50) =  '',
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
@CreatedDate as Nvarchar(75) =  '',
@UpdatedBy as Nvarchar(50) =  '',
@UpdatedDate as Nvarchar(50) =  '',
@Notes as Nvarchar(50) =  '',
@UserDefinedstr1 as Nvarchar(50) =  '',
@UserDefinedint1 as Nvarchar(50) =  '',
@UserDefinedstr2 as Nvarchar(50) =  '',
@UserDefinedInt2 as Nvarchar(50) =  '',
@UserDefinedstr3 as Nvarchar(50) =  '',
@Userdefinedint3 as Nvarchar(50) =  ''



as 
begin
	insert into dbo.customers (Company_Code, CustomerType, CompanyName,FirstName, LastName, MailingAddress, MailingAddress2, MailingCity, MailingState, MailingZip, Email, Phone, PhoneType, CreatedBy, CreatedDate, UpdatedBy,UpdatedDate, Notes, UserDefinedstr1, UserDefinedint1, UserDefinedstr2, UserDefinedInt2, UserDefinedstr3, Userdefinedint3) values (@Company_Code,
	@CustomerType,@companyName,@FirstName,@LastName,@MailingAddress,@MailingAddress2,@MailingCity,@MailingState,@MailingZip,@Email,@Phone,@PhoneType,
	@CreatedBy,@CreatedDate,@UpdatedBy,@UpdatedDate,@Notes,@UserDefinedstr1,@UserDefinedint1,@UserDefinedstr2,@UserDefinedInt2,
	@UserDefinedstr3,@Userdefinedint3);

	Select @CustomerId= @@IDENTITY;
	end

