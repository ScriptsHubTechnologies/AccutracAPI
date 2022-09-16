
CREATE procedure [dbo].spGetNotes_id
@company_code  nvarchar(10),
@table  nvarchar(50),
@CustomerId as int,
@TableId as int 



as 

if @table is not null and len(@table) <=3 or @table is null
begin
declare @cc nvarchar(10) =@company_code
declare @sql as nvarchar(500) ='select * from notes where company_code = ''' + @cc + '''' 
declare @sql2 as nvarchar(50) =' and customerid = '
set @sql=concat(@sql,@sql2,@customerid)


exec(@sql)
print (@sql)
end

if @table is not null and len(@table) >=4
begin
declare @cc1 nvarchar(10) =@company_code
declare @t nvarchar(15)=@table
declare @sql1 as nvarchar(500) ='select * from notes where company_code = ''' + @cc1 + '''' 
declare @sql4 as nvarchar(50) =' and customerid = '
declare @sql3 as nvarchar(40) =' and '+ @t + ' = ' 
set @sql=concat(@sql1,@sql4,@customerid)
set @sql=concat(@sql,@sql3,@tableid)

exec (@sql)
print (@sql)
end