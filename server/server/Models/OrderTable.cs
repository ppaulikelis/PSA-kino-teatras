using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class OrderTable
    {
        public DateTime OrderDate { get; set; }
        public bool IsPaid { get; set; }
        public DateTime AnswerDate { get; set; }
        public int Id { get; set; }
        public int FkClientId { get; set; }
    }
}
