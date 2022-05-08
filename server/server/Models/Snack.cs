using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Snack
    {
        public string Title { get; set; }
        public float Price { get; set; }
        public int Type { get; set; }
        public int Size { get; set; }
        public int Id { get; set; }
    }
}
