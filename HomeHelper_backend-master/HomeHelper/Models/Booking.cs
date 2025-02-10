using System;
using System.Collections.Generic;

namespace HomeHelper.Models
{
    public partial class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WorkerId { get; set; }
        public string Status { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string Mobile { get; set; } = null!;
        public DateTime ScheduledAt { get; set; }
        public int? Amount { get; set; }

    }
}
