using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Login;
using CourseTrackerBE.Models;
using CourseTrackerBE.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseTrackerBE.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ILiteDbContext _db;
    private readonly AuthOptions _options;

    public AuthController(ILiteDbContext db, IOptions<AuthOptions> options)
    {
        _db = db;
        _options = options.Value;
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
                var claims = new[] {
                    new Claim(ClaimTypes.Name, user.Username),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _options.Issuer,
                    audience: _options.Audience,
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
