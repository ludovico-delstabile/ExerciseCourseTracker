using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILiteDbContext _db;

        public UsersController(ILiteDbContext db)
        {
            _db = db;
        }

        [HttpGet(Name = "GetUsers")]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_db.Users.Query().ToEnumerable());
        }
        
        [HttpPost(Name = "AddUser")]
        public ActionResult<User> AddUser([FromBody] User user)
        {
            var id = _db.Users.Insert(user);
            var res = _db.Users.FindById(id);
            return Ok(res);
        }
    }
}
