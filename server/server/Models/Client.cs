using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Client
    {
        public int WatchedMovieCount { get; set; }
        public int FavouriteGenre { get; set; }
        public int Id { get; set; }
    }
}
