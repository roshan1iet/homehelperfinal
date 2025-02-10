using Microsoft.AspNetCore.Mvc;
using HomeHelper.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HomeHelper.DTOs;

namespace HomeHelper.Controllers
{
    [Route("api/workers")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("updateAvailability")]
        public async Task<IActionResult> UpdateAvailability([FromBody] UpdateAvailabilityRequest request)
        {
            if (request.WorkerId <= 0)
            {
                return BadRequest(new { message = "Invalid Worker ID" });
            }

            var worker = await _context.Workers.FindAsync(request.WorkerId);
            if (worker == null)
            {
                return NotFound(new { message = "Worker not found" });
            }

            worker.Status = request.Availability; // ✅ Update Status
            await _context.SaveChangesAsync();

            return Ok(new { message = "Availability updated successfully", status = worker.Status });
        }

        // DTO Class

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            var booking = await _context.Bookings.FirstAsync(item => item.Id == id);
            booking.Status = "Approved";
            _context.Entry(booking).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            var booking = await _context.Bookings.FirstAsync(item => item.Id == id);
            booking.Status = "Rejected";
            _context.Entry(booking).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("getPendingRequests/{id}")]
        public async Task<IActionResult> GetPendingRequests(int id)
        {
            var requests = _context.Bookings.Where(item => item.WorkerId == id).ToList();
            var users = _context.Users.ToList();
            if (requests.Count > 0)
            {
                var mappedData = requests.Select(item => new BookingDTO
                {
                    Id = item.Id,
                    Address = item.Address,
                    DateTime = item.ScheduledAt,
                    Mobile = item.Mobile,
                    UserName = users.First(i => i.Id == item.UserId).Name,
                    WorkerId = id,
                    UserId = item.UserId,
                    Amount = item.Amount,
                    Status = item.Status,
                });
                return Ok(mappedData);
            }
            else
            {
                return Ok(new List<Booking>());
            }
        }

        [HttpPost("book")]
        public async Task<IActionResult> Book(BookingDTO booking)
        {
            var exists = _context.Bookings.FirstOrDefault(item => item.UserId == booking.UserId && item.WorkerId == booking.WorkerId && item.Status == "Available");
            if (exists != null)
            {
                return Problem("Entry already exists");
            }
            _context.Bookings.Add(new Booking
            {
                UserId = booking.UserId,
                WorkerId = booking.WorkerId,
                Status = "Pending",
                Mobile = booking.Mobile,
                Address = booking.Address,
                Amount = 500,
                CreatedAt = DateTime.UtcNow,
                ScheduledAt = booking.DateTime,
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkers([FromQuery] string profession)
        {
            if (string.IsNullOrEmpty(profession))
            {
                return BadRequest(new { message = "Profession is required" });
            }

            var workers = await _context.Workers
                                        .Where(w => w.Profession == profession && w.Status == "Available")
                                        .ToListAsync();

            if (!workers.Any())
            {
                return NotFound(new { message = "No workers available for this profession." });
            }

            return Ok(workers);
        }

        // ✅ Worker Signup API
        [HttpPost("signup")]
        public async Task<IActionResult> Signup(Worker worker)
        {
            if (await _context.Workers.AnyAsync(w => w.Email == worker.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Add the profession field to the worker
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Worker registered successfully" });
        }

        // ✅ Worker Login API
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var worker = _context.Workers
                .FirstOrDefault(w => w.Email == request.Email && w.Password == request.Password);

            if (worker == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }



            var response = new
            {
                workerId = worker.Id,
                name = worker.Name,
                MobileNo = worker.MobileNo,
                status = worker.Status,
                profession = worker.Profession // Return profession in login response
            };

            return Ok(response);
        }

        // ✅ Update Worker Profile API
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateWorker(int id, [FromBody] Worker updatedWorker)
        {
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null) return NotFound(new { message = "Worker not found" });

            worker.Name = updatedWorker.Name;
            worker.MobileNo = updatedWorker.MobileNo;
            worker.Experience = updatedWorker.Experience;
            
            worker.Language = updatedWorker.Language;
            worker.Gender = updatedWorker.Gender;
            worker.AadhaarDetails = updatedWorker.AadhaarDetails;
            worker.Profession = updatedWorker.Profession; // Update profession field

            await _context.SaveChangesAsync();
            return Ok(new { message = "Worker details updated successfully" });
        }

        // ✅ Change Worker Availability Status API
        [HttpPatch("status/{id}")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody] string status)
        {
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null) return NotFound(new { message = "Worker not found" });

            worker.Status = status;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Worker status updated", status = worker.Status });
        }

        // ✅ Get Available Workers API
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableWorkers()
        {
            var workers = await _context.Workers.Where(w => w.Status == "Available").ToListAsync();
            return Ok(workers);
        }

        // ✅ Get Worker Profile API
        [HttpGet("{id}")]
        public IActionResult GetWorkerProfile(int id)
        {
            var worker = _context.Workers.FirstOrDefault(w => w.Id == id);
            if (worker == null)
                return NotFound("Worker not found");

            return Ok(worker);
        }

        // ✅ Get Worker Bookings API
       

        // Request model for updating availability
        public class UpdateAvailabilityRequest
        {
            public int WorkerId { get; set; }
            public string Availability { get; set; }
        }
    }
}

