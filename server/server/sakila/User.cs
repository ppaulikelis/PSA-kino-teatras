using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class User
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
    }
}
