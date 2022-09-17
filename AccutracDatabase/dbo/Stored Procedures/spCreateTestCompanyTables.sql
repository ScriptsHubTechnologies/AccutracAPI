
CREATE procedure [dbo].[spCreateTestCompanyTables]

@Company_Code as Nvarchar(50) =  ''



as 
begin
if exists (select 1 from products where Company_Code=@Company_Code +'Test')
begin 
delete from products where Company_Code=@Company_Code +'Test'
end 
end

begin 
insert into products
SELECT  [Company_Code]=@Company_Code +'Test'
      ,[ProductId]
      ,[ProductName]
      ,[ProjectShortName]
      ,[ProjectName]
      ,[ProjectTypeId]
      ,[SubCategory]
      ,[SubCategoryName]
      ,[UOM]
      ,[Qty]
      ,[CompanyPrice]
      ,[SalePrice] 
  FROM Products where Company_Code=@company_code
	end

