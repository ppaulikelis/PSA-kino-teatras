using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Session
    {
        public DateTime StartTime { get; set; }
        public int Id { get; set; }
        public int FkMovieId { get; set; }
        public int FkMovieHallId { get; set; }
    }
}
