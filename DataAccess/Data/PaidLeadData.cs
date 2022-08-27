using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;


namespace DataAccess.Data
{
    public  class PaidLeadData : IPaidLeadData
    {
        private readonly ISqlDataAccess _db;
        public PaidLeadData(ISqlDataAccess db)
        {
            _db = db;
        }
        public Task<IEnumerable<three_shipModel >> GetPaidLeads() =>
        _db.LoadData<three_shipModel, dynamic>(storeProcedure: "dbo.spPaidLeads_GetAll", new { });

     
        public Task InsertPaidLead(three_shipModel paidleads) =>
                    _db.SaveData(storedProcedure: "dbo.spPaidLeads_Post", new
                    {
                        paidleads.FirstName,
                        paidleads.LastName,
                        paidleads.Address,
                        paidleads.City,
                        paidleads.State,
                        paidleads.Zip,
                        paidleads.LeadId,
                        paidleads.email,
                        paidleads.project,
                        paidleads.source



                    });
        
    }
}
