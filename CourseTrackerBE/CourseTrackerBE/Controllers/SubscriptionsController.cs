using AutoMapper;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Subscriptions;
using CourseTrackerBE.Models;
using CourseTrackerBE.Services;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController : ControllerBase
    {
        private readonly ILiteDbContext _db;
        private readonly IMapper _mapper;
        private readonly SubscriptionsService _subscriptionsService;

        public SubscriptionsController(ILiteDbContext db, IMapper mapper, SubscriptionsService subscriptionsService)
        {
            _db = db;
            _mapper = mapper;
            _subscriptionsService = subscriptionsService;
        }

        [HttpGet(Name = "GetSubscriptions")]
        public ActionResult<IEnumerable<SubscriptionDto>> GetSubscriptions()
        {
            // TODO Get current User and filter by userId
            var subscriptions = _db.Subscriptions.Query().ToEnumerable();
            return Ok(_mapper.Map<IEnumerable<SubscriptionDto>>(subscriptions));
        }

        [HttpPost("Subscribe", Name = "SubscribeCourse")]
        public ActionResult SubscribeCourse([FromBody] int courseId)
        {
            //var id = _db.Courses.Insert(course);
            //var res = _db.Courses.FindById(id);
            return Ok();
        }

        [HttpPost("Unsubscribe", Name = "UnsubscribeCourse")]
        public ActionResult UnsubscribeCourse([FromBody] int courseId)
        {
            //var id = _db.Courses.Insert(course);
            //var res = _db.Courses.FindById(id);
            return Ok();
        }
    }
}
