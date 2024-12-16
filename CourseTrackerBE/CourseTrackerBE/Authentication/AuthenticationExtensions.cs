using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CourseTrackerBE.Authentication;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var issuer = configuration.GetValue("Auth:Issuer", "https://localhost:5013");
        var audience = configuration.GetValue("Auth:Audience", "api-course-tracker");
        var secretKey = configuration.GetValue("Auth:SecretKey", "e4251e7d-eb9b-47f3-9b70-b524cfc47f44")!;

        services.AddSingleton<JwtService>();
        services.AddScoped<CurrentUserService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });

        services.AddAuthorization();

        return services;
    }
}
