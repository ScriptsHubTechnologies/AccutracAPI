using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class SalesCalendarData: ISalesCalendarData
    {
        private readonly ISqlDataAccess _db;
        public SalesCalendarData(ISqlDataAccess db)
        {
            _db = db;
        }

        public async Task<IEnumerable<SalesCalendarModel>> GetSalesCalendar(string cc, string date,string employeeid )
        {
            var results = await _db.LoadData<SalesCalendarModel , dynamic>(
                storeProcedure: "dbo.spSalesCalendar",
              new { employeeid = employeeid, cc = cc, date = date });
            return results;
        }
    

   
    }
}
