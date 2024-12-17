using CourseTrackerBE.Models;
using LiteDB;

namespace CourseTrackerBE.DataAccess;

public interface IAppDbContext
{
    ILiteCollection<User> Users { get; }
    ILiteCollection<Course> Courses { get; }
    ILiteCollection<Subscription> Subscriptions { get; }
}
