
CREATE procedure [dbo].[spCustomers_GetId]
@custid nvarchar(50)


as 
begin
	select * from dbo.customers where customerid =@custid;
end