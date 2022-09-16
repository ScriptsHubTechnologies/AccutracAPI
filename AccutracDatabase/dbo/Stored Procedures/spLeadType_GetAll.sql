-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spLeadType_GetAll]
@company_code nvarchar(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT LeadType, LTRIM(RTRIM(LeadTypeName)) AS LeadTypeName
FROM     LeadType where ltrim(rtrim(company_code)) like @company_code 
END
