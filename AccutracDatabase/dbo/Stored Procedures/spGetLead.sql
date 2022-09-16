
CREATE procedure [dbo].[spGetLead]
@id int,
@company_code nvarchar(10)


as 
begin
SELECT Leads.Company_Code, Leads.LeadId, Leads.CustomerId, Leads.Status, Leads.IsDeleted, Leads.LeadSourceId, Leads.LeadSourceName, Leads.LeadSubSourceId, Leads.LeadSubSourceName, 
                  Customers.FirstName + ' ' + Customers.LastName AS Customer, JobAddress.JobAddress1 + ' ' + CASE WHEN JobAddress.JobAddress2 IS NULL 
                  THEN '' ELSE JobAddress.JobAddress2 END + ' '+ JobAddress.JobCity +', ' + jobaddress.jobstate + ' ' + JobAddress.jobZip as JobAddress, JobAddress.JobAddressId, JobAddress.ZoneId, JobAddress.ZoneName, JobAddress.GeoZoneId, JobAddress.GeoZoneName, Leads.ReferredBy, Leads.Notes, 
                  Leads.CreatedDate, Leads.CreatedBy, Leads.ConfirmLeadType
FROM     Leads INNER JOIN
                  Customers ON Leads.CustomerId = Customers.Customerid AND Leads.Company_Code = Customers.Company_Code INNER JOIN
                  JobAddress ON Customers.Customerid = JobAddress.CustomerId
WHERE        (Leads.IsDeleted = 0) and Leads.Company_Code=@company_code  and Leadid=@id;
end