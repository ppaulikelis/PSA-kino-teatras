using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Client
    {
        public int WatchedMovieCount { get; set; }
        public int? FavouriteGenre { get; set; }
        public int Id { get; set; }
        public int FkUserId { get; set; }
    }
}
