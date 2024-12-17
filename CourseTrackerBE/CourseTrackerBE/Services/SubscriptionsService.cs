using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Models;

namespace CourseTrackerBE.Services;

public class SubscriptionsService
{
    private readonly IAppDbContext _db;

    public SubscriptionsService(IAppDbContext db)
    {
        _db = db;
    }

    public Subscription Subscribe(int userId, int courseId)
    {
        var alreadyExistingSubscription = _db.Subscriptions.Query().Where(s => s.Course.Id == courseId && s.UserId == userId).FirstOrDefault();
        if (alreadyExistingSubscription != default) throw new InvalidOperationException("Subscription already exists");

        var course = _db.Courses.Query().Where(c => c.Id == courseId).FirstOrDefault();
        var newId = _db.Subscriptions.Insert(new Subscription { UserId = userId, Course = course });
        return _db.Subscriptions.FindById(newId);
    }

    public void Unsubscribe(int subscriptionId)
    {
        var subscription = _db.Subscriptions.FindById(subscriptionId);
        if (subscription == default) throw new InvalidOperationException("Subscription does not exists exists");

        var newId = _db.Subscriptions.Delete(subscriptionId);
    }
}
