﻿using AutoMapper;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Dtos.Courses;
using CourseTrackerBE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseTrackerBE.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly IAppDbContext _db;
    private readonly IMapper _mapper;

    public CoursesController(IAppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet(Name = "GetCourses")]
    public ActionResult<IEnumerable<CourseDto>> GetCourses()
    {
        var courses = _db.Courses.Query().Include(c => c.Instructor).ToEnumerable();
        return Ok(_mapper.Map<IEnumerable<CourseDto>>(courses));
    }

    [HttpPost(Name = "AddCourse")]
    public ActionResult<CourseDto> AddCourse([FromBody] CourseDto course)
    {
        var id = _db.Courses.Insert(_mapper.Map<Course>(course));
        var res = _db.Courses.FindById(id);
        return Ok(_mapper.Map<CourseDto>(res));
    }

    [HttpPatch(Name = "EditCourse")]
    public ActionResult<CourseDto> EditCourse([FromBody] CourseDto course)
    {
        _db.Courses.Update(_mapper.Map<Course>(course));
        var res = _db.Courses.FindById(course.Id);
        return Ok(_mapper.Map<CourseDto>(res));
    }
}
