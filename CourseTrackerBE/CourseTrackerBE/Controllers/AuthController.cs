using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseTrackerBE.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILiteDbContext _db;

    public AuthController(IConfiguration configuration, ILiteDbContext db)
    {
        _configuration = configuration;
        _db = db;
    }

    [HttpPost("login")]
    public ActionResult<string> Login([FromBody] LoginDto request)
    {
        var user = _db.Users.FindOne(u => u.Username == request.Username);
        if (user != null) {
            var hasher = new PasswordHasher<User>();
            var verifyPwdResult = hasher.VerifyHashedPassword(user, user.HashedPassword, request.Password);
            if (verifyPwdResult == PasswordVerificationResult.Success)
            {
                var claims = new[] { new Claim(ClaimTypes.Name, user.Username) };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("yourSecretKey"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: "yourIssuer",
                    audience: "yourAudience",
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
        }

        return Unauthorized();
    }
}
