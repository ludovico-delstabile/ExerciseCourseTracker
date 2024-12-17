using System.Security.Claims;

namespace CourseTrackerBE.Authentication;

public class CurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? UserId
    {
        get
        {
            var userClaims = _httpContextAccessor.HttpContext?.User;
            if (userClaims != null && userClaims.Identity?.IsAuthenticated == true)
            {
                var claimValue = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (claimValue != null) return int.Parse(claimValue);
            }
            return null;
        }
    }
}
