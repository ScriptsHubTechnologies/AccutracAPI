
Create procedure [dbo].[spGetSectionStatus]

@Company_Code as Nvarchar(50) =  '',

@SectionName as nvarchar(50)=''




as 
begin
SELECT Company_Code, SectionId, SectionName, StatusId, StatusIdName
FROM     Status
WHERE  (Company_Code = @company_code) AND (SectionName = @SectionName)
	end

