using CourseTrackerBE.DataAccess;
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
        private readonly SubscriptionsService _subscriptionsService;

        public SubscriptionsController(ILiteDbContext db, SubscriptionsService subscriptionsService)
        {
            _db = db;
            _subscriptionsService = subscriptionsService;
        }

        [HttpGet(Name = "GetSubscriptions")]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            // TODO Get current User and filter by userId
            return Ok(_db.Courses.Query().ToEnumerable());
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
