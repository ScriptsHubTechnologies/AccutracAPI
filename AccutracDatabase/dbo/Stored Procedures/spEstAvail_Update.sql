
create procedure [dbo].[spEstAvail_Update]

@Company_Code as nvarchar(10)=  '',
         @UserId as nvarchar(50)=  '',
         @Name as  nvarchar(50)=  '',
		 @WkDayNumber as int,
		 @WkDayName as nchar(15)='',
		 @StartDate as date,
		 @StartTime as time(7),
		 @EndTime as time(7),
		 @StartLocation as nvarchar(150)='',
		 @IsDeleted as bit,
		 @Createdby as nvarchar(50)='',
		 @CreatedDate as date


as 
begin

update EstimatorAvailibility set
                         Company_Code=@Company_Code, UserId=@UserId, Name=@Name,  WkDayNumber=@WkDayNumber, WkDayName=@WkDayName, StartDate=@StartDate, StartTime=@StartTime,EndTime=@EndTime,StartLocation=@StartLocation, IsDeleted=@IsDeleted, Createdby=@Createdby,CreatedDate=@CreatedDate where Company_Code=@Company_Code and UserId=@UserId

end

