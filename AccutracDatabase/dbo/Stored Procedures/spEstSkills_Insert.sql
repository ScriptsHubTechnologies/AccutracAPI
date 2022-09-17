
create procedure [dbo].[spEstSkills_Insert]

@Company_Code as nvarchar(10)=  '',
         @UserId as nvarchar(50)=  '',
         @Name as  nvarchar(50)=  '',
         @EmployeeCode as  nchar(10)=  '',
        @LeadType as  int, 
      @LeadTypeName as  nvarchar(50)=  '',
        @AppointmentDuration as  decimal(18,1)


as 
begin

INSERT INTO EstSkills
                         (Company_Code, UserId, Name, EmployeeCode, LeadType, LeadTypeName, AppointmentDuration)
VALUES        (@Company_Code,@UserId,@Name,@EmployeeCode,@LeadType,@LeadTypeName,@AppointmentDuration)
end