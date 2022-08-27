using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{

    public class NotesModel
    {
        public int NoteId { get; set; }

        public string Company_Code { get; set; }

        public int JobAddressId { get; set; }

        public int CustomerId { get; set; }

        public int Id { get; set; }

        public string IdTypeName { get; set; }

        public string Note { get; set; }

    }

}
