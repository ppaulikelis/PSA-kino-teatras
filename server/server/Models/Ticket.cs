using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Ticket
    {
        public int Id { get; set; }
        public int FkSessionId { get; set; }
        public int FkOrderTableId { get; set; }
        public int FkSeatId { get; set; }
    }
}
