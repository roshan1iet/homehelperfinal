using HomeHelper.Models;

namespace HomeHelper.DTOs
{
    public class UserBookingDTO : Booking
    {
        public string WorkerName { get; set; }

        public string WorkerProfession { get; set; }
    }
}
