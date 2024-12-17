using CourseTrackerBE.Enums;

namespace CourseTrackerBE.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string HashedPassword { get; set; } = string.Empty;
    public EUserType UserType { get; set; }
}
