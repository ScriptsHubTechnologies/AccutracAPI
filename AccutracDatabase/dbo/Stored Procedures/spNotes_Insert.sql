
CREATE procedure [dbo].[spNotes_Insert]

@Company_Code as Nvarchar(10),
@noteid as int=0,
@Customerid as nvarchar(50),
@JobAddress as nvarchar(50),
@Lead as nvarchar(50),
@Appointment as nvarchar(50),
@Proposal	as nvarchar(50),
@Project as nvarchar(50),
@DateTime as datetime ,
@Text as nvarchar(max),
@NoteType as nvarchar(50),
@ReferenceTo  as nvarchar(50),
@CreatedDate as datetime,
@CreatedBy as nvarchar(150)
as 
begin
	--if (@Customerid  is null or @Customerid='') set @Customerid=''
if (@JobAddress is null or @JobAddress='') set @JobAddress=''
if (@Lead is null or @Lead='') set @Lead=''
	if (@Appointment  is null or @Appointment='') set @Appointment=''
if (@Proposal is null or @Proposal='') set @Proposal=''
if (@Project is null or @Project='') set @Project=''

insert into notes (Company_Code,  CustomerId, JobAddress, Lead, Appointment, Proposal, Project, DateTime, Text, NoteType, ReferenceTo, CreatedDate, CreatedBy) values (@Company_Code, @CustomerId, @JobAddress, @Lead, @Appointment, @Proposal, @Project, @DateTime, @Text, @NoteType,@ReferenceTo, @CreatedDate, @CreatedBy)
end