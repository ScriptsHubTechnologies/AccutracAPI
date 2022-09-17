
Create procedure [dbo].[spLastEstimator-Get]

@Company_Code as nvarchar(10)=  '',
      @JobAddressId as int


as 
begin

Select * from Lastestimator where Company_Code=@Company_Code and JobAddressId=@JobAddressId

end

