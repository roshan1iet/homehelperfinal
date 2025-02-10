using Microsoft.AspNetCore.Mvc;
using HomeHelper.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

[Route("api/payments")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly AppDbContext _context;

    public PaymentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("process/{id}")]
    public async Task<IActionResult> ProcessPayment(int id)
    {
        var booking = await _context.Bookings.FirstAsync(item => item.Id == id);
        booking.Status = "Closed";
        _context.Entry(booking).State = EntityState.Modified;
        _context.SaveChanges();
        return Ok();
    }
}
