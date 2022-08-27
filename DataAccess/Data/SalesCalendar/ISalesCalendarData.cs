using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ISalesCalendarData
    {
        Task<IEnumerable<SalesCalendarModel >> GetSalesCalendar(string cc, string date,string employeeid);
    }
}