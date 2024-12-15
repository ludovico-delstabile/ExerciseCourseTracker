using CourseTrackerBE.Enums;

namespace CourseTrackerBE.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string HashedPassword { get; set; }
    public EUserType UserType { get; set; }
}
