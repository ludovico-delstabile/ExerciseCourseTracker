using AutoMapper;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Courses;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ILiteDbContext _db;
        private readonly IMapper _mapper;

        public CoursesController(ILiteDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetCourses")]
        public ActionResult<IEnumerable<CourseDto>> GetCourses()
        {
            var courses = _db.Courses.Query().ToEnumerable();
            return Ok(_mapper.Map<IEnumerable<CourseDto>>(courses));
        }

        [HttpPost(Name = "AddCourse")]
        public ActionResult<CourseDto> AddCourse([FromBody] CourseDto course)
        {
            var id = _db.Courses.Insert(_mapper.Map<Course>(course));
            var res = _db.Courses.FindById(id);
            return Ok(_mapper.Map<CourseDto>(res));
        }
    }
}
