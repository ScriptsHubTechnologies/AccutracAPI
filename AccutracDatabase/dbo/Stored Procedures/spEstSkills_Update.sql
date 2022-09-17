
create procedure [dbo].[spEstSkills_Update]

@Company_Code as nvarchar(10)=  '',
         @UserId as nvarchar(50)=  '',
         @Name as  nvarchar(50)=  '',
         @EmployeeCode as  nchar(10)=  '',
        @LeadType as  int, 
      @LeadTypeName as  nvarchar(50)=  '',
        @AppointmentDuration as  decimal(18,1)


as 
begin

update EstSkills set
                         Company_Code=@Company_Code, UserId=@UserId, Name=@Name, EmployeeCode=@EmployeeCode, LeadType=@LeadType, LeadTypeName=@LeadTypeName, AppointmentDuration=@AppointmentDuration where Company_Code=@Company_Code and UserId=@UserId

end