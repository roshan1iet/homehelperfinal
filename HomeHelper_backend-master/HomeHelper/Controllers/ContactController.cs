using Microsoft.AspNetCore.Mvc;
using HomeHelper.Models;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult SendMessage([FromBody] ContactFormRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Message))
        {
            return BadRequest(new { message = "All fields are required." });
        }

        // Save message to database
        var contact = new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Message = request.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactMessage.Add(contact);
        _context.SaveChanges();

        return Ok(new { message = "Message sent successfully!" });
    }
}

// Request Model
public class ContactFormRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
}

// Entity Model
