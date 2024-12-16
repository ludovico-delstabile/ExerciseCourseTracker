using CourseTrackerBE.Enums;
using CourseTrackerBE.Models;
using CourseTrackerBE.Options;
using LiteDB;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace CourseTrackerBE.DataAccess;

public class LiteDbContext : ILiteDbContext
{
    public LiteDatabase _db { get; }

    public LiteDbContext(IOptions<LiteDbOptions> options)
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
            var admin = new User { Username = "Admin", UserType = EUserType.Admin };
            var hasher = new PasswordHasher<User>();
            admin.HashedPassword = hasher.HashPassword(admin, "Admin1!");
            Users.Insert(admin);
        }

        var usersCount = Users.Query()
            .Where(u => u.UserType == EUserType.User)
            .Count();

        if (usersCount < 1)
        {
            var user = new User { Username = "User", UserType = EUserType.User };
            var hasher = new PasswordHasher<User>();
            user.HashedPassword = hasher.HashPassword(user, "User1!");
            Users.Insert(user);
        }
    }

}
