CREATE procedure [dbo].[spLeads_GetStatus]

@status int,
@company_code nvarchar(10)

as 
begin -- Leads.Notes,
SELECT Leads.Company_Code, Leads.LeadId, JobAddress.JobAddressId, Leads.CustomerId, Leads.ConfirmLeadType, Leads.ReferredBy, Leads.Status, Leads.CreatedDate, Leads.CreatedBy, Leads.UpdatedDate, 
                  Leads.UpdatedBy, Leads.IsDeleted, Leads.LeadSourceId, Leads.LeadSourceName, Leads.LeadSubSourceId, Leads.LeadSubSourceName, UPPER(Customers.FirstName) + ' ' + UPPER(Customers.LastName) AS Customer, 
                  JobAddress.JobAddress1 + ' ' + (CASE WHEN JobAddress.JobAddress2 IS NULL THEN '' ELSE JobAddress.JobAddress2 END) + ' ' + ZipCodes.City + ', ' + ZipCodes.State + ' ' + ZipCodes.Zip AS JobAddress
FROM     JobAddress INNER JOIN
                  Customers ON JobAddress.CustomerId = Customers.Customerid INNER JOIN
                  ZipCodes ON JobAddress.jobZip = ZipCodes.Zip RIGHT OUTER JOIN
                  Leads ON JobAddress.JobAddressId = Leads.JobAddressId AND Customers.Customerid = Leads.CustomerId
WHERE  (Leads.Status = @status) AND (Leads.Company_Code = @company_code) AND (NOT EXISTS
                      (SELECT LeadId
                       FROM      Appointment
                       WHERE   (Leads.LeadId = LeadId) AND (IsDeleted = 0)))
end

