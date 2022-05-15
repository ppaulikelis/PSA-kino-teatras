using System;
using System.Collections.Generic;

#nullable disable

namespace server.sakila
{
    public partial class Subscription
    {
        public int Id { get; set; }
        public bool IsSent { get; set; }
        public DateTime? AnswerDate { get; set; }
        public int FkMovieId { get; set; }
    }
}
