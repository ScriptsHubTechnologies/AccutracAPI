
CREATE procedure [dbo].[spcount]


as
declare  @columns NVARCHAR(MAX) = '',
@sql     NVARCHAR(MAX) = ''

SELECT 
    @columns += QUOTENAME(StatusIdName) + ','
FROM 
    Status where sectionid =0
ORDER BY 
    StatusIdName;

SET @columns = LEFT(@columns, LEN(@columns) - 1);




set @sql = 'Select * from (SELECT ArchiveLeads.LeadId, Status.StatusIdName
FROM     ArchiveLeads INNER JOIN
                  Status ON ArchiveLeads.Status = Status.StatusId
WHERE  (Status.SectionId = 0) )as l PIVOT (Count(Leadid) For StatusIdName IN ('+ @columns +')) as pvt'

EXECUTE sp_executesql @sql;