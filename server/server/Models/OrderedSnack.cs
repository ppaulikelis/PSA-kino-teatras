using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class OrderedSnack
    {
        public int Amount { get; set; }
        public int Id { get; set; }
        public int FkSnackId { get; set; }
        public int FkOrderTableId { get; set; }
    }
}
