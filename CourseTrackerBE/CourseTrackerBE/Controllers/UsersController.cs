using AutoMapper;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Users;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILiteDbContext _db;
        private readonly IMapper _mapper;

        public UsersController(ILiteDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetUsers")]
        public ActionResult<IEnumerable<UserDto>> GetUsers()
        {
            var users = _db.Users.Query().ToEnumerable();
            return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
        }
        
        [HttpPost(Name = "AddUser")]
        public ActionResult<UserDto> AddUser([FromBody] UserDto user)
        {
            var id = _db.Users.Insert(_mapper.Map<User>(user));
            var res = _db.Users.FindById(id);
            return Ok(_mapper.Map<UserDto>(res));
        }
    }
}
