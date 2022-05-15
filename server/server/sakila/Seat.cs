using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Seat
    {
        public int Row { get; set; }
        public int Number { get; set; }
        public int Id { get; set; }
        public int FkMovieHallId { get; set; }
        public int FkChairTypeId { get; set; }
    }
}
