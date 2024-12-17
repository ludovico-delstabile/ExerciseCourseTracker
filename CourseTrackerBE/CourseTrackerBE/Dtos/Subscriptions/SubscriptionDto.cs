using CourseTrackerBE.Dtos.Courses;

namespace CourseTrackerBE.Dtos.Subscriptions;

public class SubscriptionDto
{
    public int Id { get; set; }
    public CourseDto? Course { get; set; }
    public float TrackedHours { get; set; }
}
