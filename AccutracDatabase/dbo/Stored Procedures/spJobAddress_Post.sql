
CREATE procedure [dbo].[spJobAddress_Post]

 @CustomerId int,
 @Company_Code Nvarchar(10),
 @Address1 Nvarchar(100),
 @Address2 Nvarchar(100),
 @City nvarchar(50),
 @State nchar(2),
 @Zip nchar(10),
 @CreatedDate datetimeoffset(7),
 @CreatedBy nvarchar(50),
 @UpdatedDate datetimeoffset(7) ='',
 @UpdatedBy nvarchar(50) ='',
 @GeoZoneId int,
 @GeoZoneName nvarchar(50),
 @ZoneId int,
 @ZoneName nvarchar(50)

as 
begin
	INSERT INTO [dbo].[JobAddress]
           ([CustomerId]
           ,[Company_Code]
           ,[JobAddress1]
           ,[JobAddress2]
           ,[JobCity]
           ,[JobState]
           ,[JobZip]
           ,[CreatedDate]
           ,[CreatedBy]
           ,[UpdatedDate]
           ,[UpdatedBy]
		   ,[GeoZoneId]
		   ,[GeoZoneName]
		   ,[ZoneId]
		   ,[ZoneName]) 
		   values (@CustomerId, @Company_Code,@Address1, @Address2, @City, @State, @Zip, @CreatedDate, @CreatedBy, @UpdatedDate, @UpdatedBy,@GeoZoneId,@GeoZoneName,@ZoneId,@ZoneName);
end