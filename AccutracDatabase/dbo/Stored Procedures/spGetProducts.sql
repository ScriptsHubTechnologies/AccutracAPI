
CREATE procedure [dbo].[spGetProducts]

@company_code nchar(10)

as 
begin

 select Company_Code, ProductId, ltrim(rtrim(ProductName)) as ProductName, ltrim(rtrim(ProjectName)) as ProjectName, ltrim(rtrim(ProjectShortName)) as ProjectShortName, ProjectTypeId, SubCategory, ltrim(rtrim(SubCategoryName)) as SubCategoryName, UOM, Qty,CompanyPrice,SalePrice
FROM           Products WHERE    (Company_Code = @company_code) order by ProjectTypeId,SubCategory,ProductId ;

end