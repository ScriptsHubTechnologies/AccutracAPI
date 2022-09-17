
CREATE procedure [dbo].[spJobAddress_Update]

 @JobAddressId int,
 @CustomerId int,
 @Company_Code Nvarchar(10),
 @Address1 Nvarchar(100),
 @Address2 Nvarchar(100),
 @City nvarchar(50),
 @State nchar(2),
 @Zip nchar(10),
 @CreatedDate datetimeoffset(7),
 @CreatedBy nvarchar(50),
 @UpdatedDate datetimeoffset(7) ,
 @UpdatedBy nvarchar(50)

as 
begin
	 update JobAddress set CustomerId=@CustomerId,Company_Code=@Company_Code, JobAddress1=@Address1, JobAddress2=@Address2, JobCity=@City, JObState =@State, JobZip=@Zip, UpdatedDate =@UpdatedDate, @UpdatedBy =@UpdatedBy where JobAddressId=@JobAddressId and Company_Code=@Company_Code 

	-- CreatedDate=@CreatedDate, CreatedBy=@CreatedBy,
	end