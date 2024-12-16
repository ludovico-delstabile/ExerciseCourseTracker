using CourseTrackerBE.Authentication;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Login;
using CourseTrackerBE.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly IAppDbContext _context;
    private readonly JwtService _jwtService;

    public LoginController(IAppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost]
    public ActionResult<string> Login([FromBody] LoginDto request)
    {
        var user = _context.Users.Find(u => u.Username == request.Username).FirstOrDefault();
        if (user == null || !PasswordUtils.VerifyPassword(request.Password, user.HashedPassword))
        {
            return Unauthorized("Invalid username or password");
        }

        var token = _jwtService.GenerateToken(user.Username, user.Id);
        return Ok(token);
    }
}
