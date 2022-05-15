using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Movie
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float Price { get; set; }
        public string Icon { get; set; }
        public int Genre { get; set; }
        public int Id { get; set; }
    }
}
