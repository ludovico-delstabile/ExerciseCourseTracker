using CourseTrackerBE.Enums;

namespace CourseTrackerBE.Dtos;
public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string HashedPassword { get; set; }
    public EUserType UserType { get; set; }
}
