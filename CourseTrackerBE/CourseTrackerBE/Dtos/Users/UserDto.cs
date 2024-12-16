using CourseTrackerBE.Enums;

namespace CourseTrackerBE.Dtos.Users;
public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public EUserType UserType { get; set; }
}
