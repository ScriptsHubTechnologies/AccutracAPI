
create procedure [dbo].[spEstAvail_Insert]

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

insert into EstimatorAvailibility (  Company_Code, UserId, Name, WkDayNumber, WkDayName, StartDate, StartTime, EndTime, StartLocation, IsDeleted, Createdby, CreatedDate) values (@Company_Code, @UserId, @Name, @WkDayNumber, @WkDayName, @StartDate, @StartTime, @EndTime, @StartLocation, @IsDeleted, @Createdby, @CreatedDate)
                       

end

