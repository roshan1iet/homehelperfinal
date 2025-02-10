using Microsoft.AspNetCore.Mvc;
using HomeHelper.Models;
using HomeHelper;
using System.Threading.Tasks;
using HomeHelper.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound("User not found!");

        user.Name = updatedUser.Name;
        user.MobileNo = updatedUser.MobileNo;
        user.Email = updatedUser.Email;
        user.Address = updatedUser.Address;

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return Ok("Profile updated successfully!");
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound("User not found!");

        return Ok(user);
    }


    // ✅ User Signup API
    [HttpPost("signup")]
    public async Task<IActionResult> Signup(User user)
    {
        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
        {
            return BadRequest(new { message = "Email already exists" });
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User registered successfully" });
    }

    // ✅ User Login API
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

        if (user == null)
        {
            Console.WriteLine("❌ Invalid Login Attempt: " + loginRequest.Email);
            return Unauthorized(new { message = "Invalid credentials" });
        }

        Console.WriteLine("✅ Login Successful: " + user.Name + " (ID: " + user.Id + ")");

        return Ok(new { id = user.Id, name = user.Name, address = user.Address, mobileno = user.MobileNo });
    }



}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
