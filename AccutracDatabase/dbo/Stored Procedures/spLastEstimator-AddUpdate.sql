
CREATE procedure [dbo].[spLastEstimator-AddUpdate]

@Company_Code as nvarchar(10)=  '',
      @JobAddressId as int,
	  @AssignedToId as nvarchar(150),
	  @AssignedToName as nvarchar(150)
	  --@Date as date 
	 


as 


if Exists (select * from LastEstimator where Company_Code=@Company_Code and JobAddressId=@JobAddressId)
begin 
declare @cc1 as nvarchar(10)=@company_code
declare @asstoid1 as nvarchar(150) = @AssignedToId
declare @asstoname1 as nvarchar(150) =@AssignedToName
declare @jId1 as int =352302--@JobAddressId
declare @d1 as date = getdate()
 declare @sql1 as nvarchar(max)='Update LastEstimator set AssignedToId = ''' + @asstoid1 + ''' , AssignedToName= ''' + @asstoname1+''' , Date= ''' + convert(nvarchar(10),@d1) + ''' where  Company_Code= '''+@cc1+''' and JobAddressId='
 set @sql1 = concat(@sql1,@JobAddressId)

exec (@sql1)
print ( @sql1)
end

if Not Exists (select * from LastEstimator where Company_Code=@Company_Code and JobAddressId=@JobAddressId)
begin 
declare @cc2 as nvarchar(10)=@company_code
declare @asstoid2 as nvarchar(150) = @AssignedToId
declare @asstoname2 as nvarchar(150) =@AssignedToName
declare @jaId2 as int =@JobAddressId
declare @d2 as date = getdate()
declare @sql2 as nvarchar(150)='Insert into LastEstimator  (Company_Code,JobAddressId,AssignedToId,AssignedToName,Date) values ('''+@cc2+''', '
declare @sql3 as nvarchar(150)=','''+ @asstoid2 + ''', '''+ @asstoname2+ ''' , '''
declare @sql4 as nvarchar(3) =''')'
set @sql2 = concat (@sql2,@JobAddressId)
set @sql2 = concat(@sql2,@sql3,@d2,@sql4)

exec (@sql2)
print (@sql2)
--print (@sql3)

end