
CREATE procedure [dbo].[spcount1]
@company_code nvarchar(10),
@SectionName nvarchar(25),
@TableName as nvarchar(25)

as
declare  @columns NVARCHAR(MAX) = '',
@sql     NVARCHAR(MAX) = '',
@cc nvarchar(10) =''

SELECT 
    @columns += QUOTENAME(StatusIdName) + ','
FROM 
    Status where SectionName =@SectionName and Company_Code=@company_code
ORDER BY 
    StatusIdName;

SET @columns = LEFT(@columns, LEN(@columns) - 1);


set @sql ='Select * from (SELECT COUNT(*) AS Count, Status.StatusIdName as Status
FROM     '+@tablename +' t INNER JOIN
                  Status ON t.Company_Code = Status.Company_Code AND t.Status = Status.StatusId
WHERE  (t.Company_Code = ''' + @company_code + ''' ) AND (Status.SectionName = ''' +@sectionName +''')
GROUP BY Status.StatusIdName) as s Pivot (Max(count) for status in ('+ @columns +')) as pvt'

--set @sql = 'Select * from (SELECT *
--FROM     '+ @TableName +' as t INNER JOIN
--                  Status ON t.Status = Status.StatusId
--WHERE  (Status.SectionId = '+ @SectionName +') )as l PIVOT (Count( t.leadid ) For StatusIdName IN ('+ @columns +')) as pvt'
print @sql
EXECUTE sp_executesql @sql;

