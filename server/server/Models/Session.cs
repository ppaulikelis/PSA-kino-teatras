using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Session
    {
        public TimeSpan StartTime { get; set; }
        public int Id { get; set; }
        public int FkMovieId { get; set; }
        public int FkMovieHallId { get; set; }
    }
}
