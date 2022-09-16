
CREATE procedure [dbo].spEstAvailSkilljson_Insert

@json as nvarchar(max)


as 
begin

INSERT INTO Helitrack_TempTables.dbo.json
                         (BulkCopy )
VALUES        (@json)
end