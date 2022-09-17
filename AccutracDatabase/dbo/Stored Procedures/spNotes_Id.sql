
CREATE procedure [dbo].[spNotes_Id]

@Company_Code Nvarchar(10),
@Customerid nvarchar(50),
@JobAddress  nvarchar(50),
@Lead nvarchar(50),
@Appointment nvarchar(50),
@Proposal	nvarchar(50),
@Project nvarchar(50)



as 
begin
	if (@Customerid  is null or @Customerid='') set @Customerid='%'
if (@JobAddress is null or @JobAddress='') set @JobAddress='%'
if (@Lead is null or @Lead='') set @Lead='%'
	if (@Appointment  is null or @Appointment='') set @Appointment='%'
if (@Proposal is null or @Proposal='') set @Proposal='%'
if (@Project is null or @Project='') set @Project='%'

	SELECT * FROM Notes where company_code=@Company_Code  and customerid like @customerid and JobAddress like @JobAddress and Lead like @Lead and Appointment like @Appointment and Proposal like @Proposal and Project like @Project and not(text is null) 
ORDER BY createdDate
end