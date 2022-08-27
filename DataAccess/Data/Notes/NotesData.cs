using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DbAccess;
using DataAccess.Models;
namespace DataAccess.Data
{
    public class NotesData: INotesData
    {
        private readonly ISqlDataAccess _db;
        public NotesData(ISqlDataAccess db)
        {
            _db = db;
        }
        public async Task<IEnumerable<NotesModel >> GetAllNotes(string cc, string jobaddressid)
        {
            var results = await _db.LoadData<NotesModel, dynamic>(
                storeProcedure: "dbo.spNotes_All",
                new { Company_Code = cc, JobAddressid = jobaddressid });
            return results;
        }

     
        public async Task<IEnumerable<NotesModel>> GetNotesfromType(string cc,string id, string idtypename)
        {
            var results = await _db.LoadData<NotesModel, dynamic>(
                storeProcedure: "dbo.spNotes_IdType",
                new { Company_Code = cc, Id = id ,IdTypeName=idtypename});
            return results;
        }

    
    }
}
