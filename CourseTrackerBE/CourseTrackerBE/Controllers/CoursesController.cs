using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ILiteDbContext _db;

        public CoursesController(ILiteDbContext db)
        {
            _db = db;
        }

        [HttpGet(Name = "GetCourses")]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            return Ok(_db.Courses.Query().ToEnumerable());
        }

        [HttpPost(Name = "AddCourse")]
        public ActionResult<Course> AddCourse([FromBody] Course course)
        {
            var id = _db.Courses.Insert(course);
            var res = _db.Courses.FindById(id);
            return Ok(res);
        }
    }
}
