namespace CourseTrackerBE.Models;

public class Subscription
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public Course Course { get; set; }
}
