using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using HomeHelper.Models;
using HomeHelper.DTOs;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingController(AppDbContext context)
    {
        _context = context;
    }

   

   



    [HttpGet("user-bookings/{userId}")]
    public async Task<IActionResult> GetUserBookings(int userId)
    {
        var bookings = await _context.Bookings
            .Where(b => b.UserId == userId)
            .Select(item => 
                new UserBookingDTO
                {
                    Address = item.Address,
                    Amount = item.Amount,
                    CreatedAt = item.CreatedAt,
                    Id = item.Id,
                    Mobile = item.Mobile,
                    ScheduledAt = item.ScheduledAt,
                    Status = item.Status,
                    UserId = item.UserId,
                    WorkerId = item.WorkerId,
                    WorkerName = _context.Workers.First(i => i.Id == item.WorkerId).Name,
                    WorkerProfession = _context.Workers.First(i => i.Id == item.WorkerId).Profession
                })
            .ToListAsync();

        var workers = _context.Workers.ToList();

        if (bookings == null || bookings.Count == 0)
        {
            return NotFound(new { message = "No bookings found." });
        }

        return Ok(bookings);
    }


    [HttpPost("create")]
    public async Task<IActionResult> CreateBooking([FromBody] Booking bookingRequest)
    {
        if (bookingRequest == null )
        {
            return BadRequest(new { success = false, message = "Invalid booking data!" });
        }

        // ✅ Ensure UserId is stored as an integer
        

        var newBooking = new Booking
        {
            // ✅ Ensure integer conversion
            WorkerId = bookingRequest.WorkerId,
            Address = bookingRequest.Address,
            Mobile = bookingRequest.Mobile,
            Status = "Booked",
            CreatedAt = DateTime.UtcNow
        };

        _context.Bookings.Add(newBooking);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, bookingId = newBooking.Id });
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        
        if(booking == null)
        {
            return Problem("Not found");
        }

        _context.Bookings.Remove(booking);
        _context.SaveChanges();

        return Ok(new { message = "Booking deleted successfully" });
    }



}
