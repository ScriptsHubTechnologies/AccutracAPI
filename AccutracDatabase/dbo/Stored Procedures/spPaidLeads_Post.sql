
Create procedure [dbo].spPaidLeads_Post

@FirstName as Nvarchar(50) =  '',
@LastName as Nvarchar(50) =  '',
@Address as Nvarchar(50) =  '',

@City as Nvarchar(50) =  '',
@State as Nvarchar(50) =  '',
@Zip as Nvarchar(50) =  '',
@Email as Nvarchar(50) =  '',
@LeadId as Nvarchar(50) =  '',
@Project as Nvarchar(50) =  '',
@Source as Nvarchar(50) =  ''




as 
begin
	insert into dbo.PaidLeads (FirstName,LastName,Address,City,State,Zip,Email,LeadId,Project,Source) values (@FirstName,@LastName,@Address,@City,@State,@Zip,@Email,@LeadId,@Project,@Source);

	
	end

