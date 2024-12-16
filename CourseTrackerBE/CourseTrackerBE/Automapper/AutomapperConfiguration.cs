using AutoMapper;
using CourseTrackerBE.Dtos.Courses;
using CourseTrackerBE.Dtos.Subscriptions;
using CourseTrackerBE.Dtos.Users;
using CourseTrackerBE.Models;

namespace CourseTrackerBE.Automapper;

public class AutomapperConfiguration : Profile
{
    public AutomapperConfiguration()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Subscription, SubscriptionDto>().ReverseMap();
        CreateMap<Course, CourseDto>().ReverseMap();
    }
}
