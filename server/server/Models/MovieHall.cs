using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class MovieHall
    {
        public int Number { get; set; }
        public int Id { get; set; }
        public int FkMovieTheatreId { get; set; }
    }
}
