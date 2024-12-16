using CourseTrackerBE.Enums;
using CourseTrackerBE.Models;
using CourseTrackerBE.Utils;
using LiteDB;
using Microsoft.Extensions.Options;

namespace CourseTrackerBE.DataAccess;

public class AppDbContext : IAppDbContext
{
    public LiteDatabase _db { get; }

    public AppDbContext(IOptions<LiteDbOptions> options)
    {
        Configure();
        _db = new LiteDatabase(options.Value.DatabaseLocation);
        Seed();
    }

    // Esempio di una collezione di utenti
    public ILiteCollection<User> Users => _db.GetCollection<User>("users");
    public ILiteCollection<Course> Courses => _db.GetCollection<Course>("courses");
    public ILiteCollection<Subscription> Subscriptions => _db.GetCollection<Subscription>("subscriptions");

    private void Configure()
    {
        BsonMapper.Global.Entity<Subscription>().DbRef(x => x.Course, "courses");
        BsonMapper.Global.Entity<Course>().DbRef(x => x.Instructor, "users");
    }

    private void Seed()
    {
        SeedUsers();
    }
    private void SeedUsers()
    {
        var adminCount = Users.Query()
            .Where(u => u.UserType == EUserType.Admin)
            .Count();

        if (adminCount < 1)
        {
            var admin = new User { Username = "Admin", UserType = EUserType.Admin, HashedPassword = PasswordUtils.HashPassword("Admin1!") };
            Users.Insert(admin);
        }

        var usersCount = Users.Query()
            .Where(u => u.UserType == EUserType.User)
            .Count();

        if (usersCount < 1)
        {
            var user = new User { Username = "User", UserType = EUserType.User, HashedPassword = PasswordUtils.HashPassword("User1!") };
            Users.Insert(user);
        }
    }

}
