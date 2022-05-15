using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Subscription
    {
        public int Id { get; set; }
        public bool? IsSent { get; set; }
        public DateTime? AnswerDate { get; set; }
        public int FkMovieId { get; set; }

        public Subscription(bool? isSent, DateTime? answerDate, int fkMovieId)
        {
            IsSent = isSent;
            AnswerDate = answerDate;
            FkMovieId = fkMovieId;
        }
    }
}
