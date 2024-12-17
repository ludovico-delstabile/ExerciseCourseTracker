using AutoMapper;
using CourseTrackerBE.Authentication;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Subscriptions;
using CourseTrackerBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SubscriptionsController : ControllerBase
{
    private readonly IAppDbContext _db;
    private readonly IMapper _mapper;
    private readonly CurrentUserService _currentUserService;
    private readonly SubscriptionsService _subscriptionsService;

    public SubscriptionsController(IAppDbContext db, IMapper mapper, SubscriptionsService subscriptionsService, CurrentUserService currentUserService)
    {
        _db = db;
        _mapper = mapper;
        _subscriptionsService = subscriptionsService;
        _currentUserService = currentUserService;
    }

    [HttpGet(Name = "GetSubscriptions")]
    public ActionResult<IEnumerable<SubscriptionDto>> GetSubscriptions()
    {
        var userId = _currentUserService.UserId!.Value;
        var subscriptions = _db.Subscriptions
            .Query()
            .Include(s => s.Course).Include(s => s.Course.Instructor)
            .Where(s => s.UserId == userId)
            .ToEnumerable();
        return Ok(_mapper.Map<IEnumerable<SubscriptionDto>>(subscriptions));
    }

    [HttpPost("Subscribe", Name = "SubscribeCourse")]
    public ActionResult<SubscriptionDto> SubscribeCourse([FromBody] int courseId)
    {
        var subscription = _subscriptionsService.Subscribe(_currentUserService.UserId!.Value, courseId);
        return Ok(_mapper.Map<SubscriptionDto>(subscription));
    }

    [HttpPost("{subscriptionId}/Unsubscribe", Name = "UnsubscribeCourse")]
    public ActionResult UnsubscribeCourse(int subscriptionId)
    {
        _subscriptionsService.Unsubscribe(subscriptionId);
        return Ok();
    }

    [HttpPatch("{subscriptionId}/UpdateTrackedTime", Name = "UpdateTrackedTime")]
    public ActionResult<SubscriptionDto> UpdateTrackedTime(int subscriptionId, [FromBody] float trackedhours)
    {
        var subscription = _db.Subscriptions.FindById(subscriptionId);
        subscription.TrackedHours = trackedhours;
        _db.Subscriptions.Update(subscription);
        return Ok(_mapper.Map<SubscriptionDto>(subscription));
    }
}
