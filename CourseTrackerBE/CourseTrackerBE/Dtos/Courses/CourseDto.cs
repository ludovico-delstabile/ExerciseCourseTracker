using CourseTrackerBE.Dtos.Users;

namespace CourseTrackerBE.Dtos.Courses;

public class CourseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public UserDto? Instructor { get; set; }
}
