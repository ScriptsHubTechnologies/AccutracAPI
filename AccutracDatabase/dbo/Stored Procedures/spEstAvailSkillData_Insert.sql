
CREATE procedure [dbo].[spEstAvailSkillData_Insert]

@JSON varchar(max)='',
@sjson varchar(max)='',
@uniqueid as nvarchar(50) ='',
@id as int=0
as
begin

INSERT INTO Helitrack_TempTables.dbo.json
                         (BulkCopy )
VALUES        (@sjson)


SELECT @JSON=BulkCopy,@id=id
FROM Helitrack_TempTables.dbo.json

if OBJECT_ID (N'Helitrack_TempTables.dbo.tlead',N'U') is not null 
drop table Helitrack_TempTables.dbo.tlead

 SELECT i.Id, i.company_code,i.userid,i.Name,i.wkDayNumber,i.wkDayName,i.startDate,i.startTime,i.endTime,i.startLocation,i.isDeleted,i.createdBy,i.createdDate,i.employeeCode,i.appointmentDuration,i.uniqueId,a.leadType into Helitrack_TempTables.dbo.tlead
FROM OPENJSON(@json) WITH (
  id varchar(10) '$.id',
    company_code varchar(10) '$.company_Code',
userid varchar(50) '$.userId',
Name varchar(150) '$.name',
wkDayNumber varchar(2) '$.wkDayNumber',
wkDayName varchar(15) '$.wkDayName',
startDate varchar(10) '$.startDate',
startTime varchar(15) '$.startTime',
endTime varchar(15) '$.endTime',
startLocation varchar(150) '$.startLocation',
isDeleted bit '$.isDeleted',
createdBy varchar(50) '$.createdby',
createdDate varchar(10) '$.createdDate',
employeeCode varchar(10) '$.employeeCode',
appointmentDuration varchar(4) '$.appointmentDuration',
uniqueId varchar(50) '$.uniqueid',

leadTypes nvarchar(max) '$.leadTypes'
AS JSON) AS i
CROSS APPLY OPENJSON(i.leadTypes) WITH (
   leadType nvarchar(max) '$'
) as a 

if OBJECT_ID (N'Helitrack_TempTables.dbo.tGeozone',N'U') is not null 
drop table Helitrack_TempTables.dbo.tGeozone

SELECT i.Id, i.company_code,a.GeoZoneid into Helitrack_TempTables.dbo.tGeozone
FROM OPENJSON(@json) WITH (
  id varchar(10) '$.id',
company_code varchar(10) '$.company_Code',
geoZones nvarchar(max) '$.geoZones'
AS JSON) AS i
CROSS APPLY OPENJSON(i.geoZones) WITH (
   GeoZoneid nvarchar(max) '$'
) as a;

select @uniqueid =  tlead.uniqueId FROM     Helitrack_TempTables.dbo.tlead

delete from helitrack_production_5.dbo.EstSkillAvail where exists (select * from helitrack_production_5.dbo.EstSkillAvail as b where helitrack_production_5.dbo.EstSkillAvail.uniqueid=@uniqueid )

 insert into helitrack_production_5.dbo.EstSkillAvail  select  tGeozone.company_code, tlead.userid,tlead.name, tlead.wkDayNumber, tlead.wkDayName, tlead.startDate, tlead.startTime, tlead.endTime, tlead.startLocation, tlead.isDeleted, tlead.createdBy, tlead.createdDate, 
                  tlead.employeeCode, tlead.leadType,  tlead.appointmentDuration, tGeozone.GeoZoneid, tlead.uniqueId
FROM     Helitrack_TempTables.dbo.tGeozone INNER JOIN
                   Helitrack_TempTables.dbo.tlead ON tGeozone.Id = tlead.Id AND tGeozone.company_code = tlead.company_code;

delete from Helitrack_TempTables.dbo.json where id =@id

end