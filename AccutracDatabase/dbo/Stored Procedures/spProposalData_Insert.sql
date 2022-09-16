
CREATE procedure [dbo].[spProposalData_Insert]

@JSON varchar(max)='',
@sjson varchar(max)=''

as
begin

INSERT INTO Helitrack_TempTables.dbo.ProposalDetalJson
                         (BulkCopy )
VALUES        (@sjson)


--declare @json as nvarchar(max)
--declare @id as int
declare @company_code nvarchar(10)
declare @proposalid nvarchar(50)
declare @products as nvarchar(max)
declare @statements as nvarchar(max)
declare @id as int
SELECT @JSON=BulkCopy,@id=id
FROM Helitrack_TempTables.dbo.ProposalDetalJson

Select @proposalid = proposalid from openjson(@json) with(proposalid nvarchar(50) '$.proposalId');
Select @company_code  = Company_Code  from openjson(@json) with(company_code varchar(10) '$.company_Code');

IF  EXISTS  (select Proposalid from proposal where company_code =@company_code and ProposalId=@proposalid)

delete  from proposal where company_code =@company_code and ProposalId=@proposalid;

insert into Proposal Select * from (Select company_code, ProposalId, CustomerId, LeadId, JobAddressId, AppointmentId, CustomerVisitId, status, ProposalStatusName, IsGenerated, Total, Discount,assignedTo,assignedName,discountPercentage,discountedTotal,createdBy,createdDate   from openjson(@json) with(company_code varchar(10) '$.company_Code',customerVisitId int '$.customerVisitId',appointmentId int '$.appointmentId',leadId int '$.leadId',jobAddressId int '$.jobAddressId',customerId int '$.customerId',status int '$.status',proposalStatusName nvarchar(50) '$.proposalStatusName',isGenerated bit '$.isGenerated', Proposalid nvarchar(50) '$.proposalId',Total decimal '$.total',discount decimal '$.discount',assignedTo nvarchar(50) '$.assignedTo',assignedName nvarchar(100) '$.assignedName',discountPercentage decimal '$.discountPercentage',discountedTotal decimal '$.discountedTotal',createdBy nvarchar(100) '$.createdBy',createdDate date '$.createdDate')) as j;


select @products= products from openjson(@json) with( products nvarchar(max) '$.products'
AS JSON) as p;

select proposalid from proposalproducts where Company_Code=@company_code and ProposalId=@proposalid

delete from proposalproducts where Company_Code=@company_code and ProposalId=@proposalid;

insert into proposalproducts select * from (select company_code,proposalid,productid,productName,projectTypeId,projectShortName,projectName,subCategory,subCategoryName,uOM,Qty,companyPrice,salePrice,sortOrder,IsRecommended from openjson(@products) with (company_code nvarchar(10) '$.company_Code',proposalid nvarchar(50) '$.proposalId',productid int '$.productId',productName nvarchar(50) '$.productName',projectTypeId int '$.projectTypeId',projectShortName nvarchar(10) '$.projectShortName',projectName nvarchar(50) '$.projectName',subCategory int '$.subCategory',subCategoryName nvarchar(50) '$.subCategoryName',uOM nvarchar(50) '$.uOM',Qty int '$.qty',companyPrice decimal '$.companyPrice',salePrice decimal '$.salePrice',sortOrder int '$.sortOrder',IsRecommended bit '$.isRecommended')) as pr;

select @Statements= statements from openjson(@json) with( statements nvarchar(max) '$.statements'
AS JSON) as s

if EXISTS (select proposalid from ProposalStatement where Company_Code=@company_code and ProposalId=@proposalid)
delete from ProposalStatement where Company_Code=@company_code and ProposalId=@proposalid;

insert into ProposalStatement select * from (select company_Code,proposalId,projectId,projectTypeName,statementId,statementType,statementTypeName,statement,sortOrder from openjson(@statements) with(company_code nvarchar(10) '$.company_Code',proposalid nvarchar(50) '$.proposalId',projectId int '$.projectId',projectTypeName nvarchar(50) '$.projectTypeName',statementId int '$.statementId',statementType int '$.statementType',statementTypeName nvarchar(50) '$.statementTypeName',statement nvarchar(1000) '$.statement',sortOrder int '$.sortOrder')) as st;

delete from Helitrack_TempTables.dbo.ProposalDetalJson where id=@id

end