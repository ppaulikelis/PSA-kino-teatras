using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Manager
    {
        public int Id { get; set; }
        public int FkUserId { get; set; }
    }
}
