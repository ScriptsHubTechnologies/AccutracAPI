using DataAccess.DbAccess;
using DataAccess.Models;


namespace DataAccess.Data
{
    public interface INotesData
    {
        Task<IEnumerable<NotesModel >> GetAllNotes(string cc, string jobaddressid);
        Task<IEnumerable<NotesModel >> GetNotesfromType(string cc,string id, string idtypename);
    }
}