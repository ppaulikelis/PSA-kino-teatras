using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public int Genre_fk { get; set; }
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float Price { get; set; }
        public string Icon { get; set; }

    }
}
