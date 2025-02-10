using System;
using System.Collections.Generic;

namespace HomeHelper.Models
{
    public partial class Worker
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string MobileNo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Experience { get; set; } = null!;
        public string Profession { get; set; } = null!;
        public string Language { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string AadhaarDetails { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? IsBooked { get; set; }
    }
}
