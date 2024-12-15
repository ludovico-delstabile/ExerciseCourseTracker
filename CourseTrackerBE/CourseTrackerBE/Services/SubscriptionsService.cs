using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Models;

namespace CourseTrackerBE.Services;

public class SubscriptionsService
{
    private readonly ILiteDbContext _db;

    public SubscriptionsService(ILiteDbContext db)
    {
        _db = db;
    }

    public Subscription SubscribeUser(int userId, int courseId)
    {
        var alreadyExistingSubscription = _db.Subscriptions.Query().Where(s => s.Course.Id == courseId && s.UserId == userId).FirstOrDefault();
        if (alreadyExistingSubscription != default) throw new InvalidOperationException("Subscription Already Exists");

        var course = _db.Courses.Query().Where(c => c.Id == courseId).FirstOrDefault();
        var newId = _db.Subscriptions.Insert(new Subscription { UserId = userId, Course = course });
        return _db.Subscriptions.FindById(newId);
    }
}
