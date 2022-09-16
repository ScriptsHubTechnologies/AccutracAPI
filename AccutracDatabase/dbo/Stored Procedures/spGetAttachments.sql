
CREATE procedure [dbo].spGetAttachments
@company_code  nvarchar(10),
@CustomerId as int,
@JobAddressId as int,
@FunctionName  nvarchar(50),
@FunctionId as int 



as 
if @JobAddressId is null 
begin
declare @cc nvarchar(10) =@company_code
declare @csql as nvarchar(500) ='select * from attachments where company_code = ''' + @cc + '''' 
declare @csql1 as nvarchar(50) =' and customerid = '
set @csql=concat(@csql,@csql1,@customerid)
exec (@csql)
print (@csql)
end


if @FunctionName is not null and len(@FunctionName) <=3 or @FunctionName is null and @JobAddressId is not null
begin
declare @cc1 nvarchar(10) =@company_code
declare @fsql as nvarchar(500) ='select * from attachments where company_code = ''' + @cc + '''' 
declare @fsql1 as nvarchar(50) =' and customerid = '
declare @fsql2	as nvarchar(50) = ' and JobAddressId = '
set @fsql=concat(@fsql,@fsql1,@customerid)
set @fsql=concat(@fsql,@fsql2,@JobAddressId)

exec(@fsql)
print (@fsql)
end

if @FunctionName is not null and len(@FunctionName) >=4
begin
declare @cc2 nvarchar(10) =@company_code
declare @fn as varchar(50) =@FunctionName
declare @t nvarchar(15)=@Functionid
declare @sql as nvarchar(500) ='select * from attachments where company_code = ''' + @cc1 + '''' 
declare @sql1 as nvarchar(50) =' and customerid = '
declare @sql2	as nvarchar(50) = ' and JobAddressId = '
declare @sql3	as nvarchar(50) = ' and FunctionTable = ''' +@fn+ ''''
declare @sql4 as nvarchar(40) =' and FunctionId = ' 
set @sql=concat(@sql,@sql1,@customerid)
set @sql=concat(@sql,@sql2,@JobAddressId)
set @sql=concat(@sql,@sql3)
set @sql=concat(@sql,@sql4,@FunctionId)

exec (@sql)
print (@sql)
end