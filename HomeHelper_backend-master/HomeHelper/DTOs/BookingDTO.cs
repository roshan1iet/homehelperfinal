namespace HomeHelper.DTOs
{
    public class BookingDTO
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? Profession { get; set; }
        public int WorkerId { get; set; }
        public string Address { get; set; }
        public DateTime DateTime { get; set; }

        public int? Amount { get; set; }
        public string Mobile { get; set; }
        public string? Status { get; set; }
    }
}
