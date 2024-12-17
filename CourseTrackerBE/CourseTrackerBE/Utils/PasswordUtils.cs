using System.Security.Cryptography;
using System.Text;

namespace CourseTrackerBE.Utils;

public static class PasswordUtils
{
    public static bool VerifyPassword(string password, string storedHash)
    {
        var hash = HashPassword(password);
        return hash == storedHash;
    }

    public static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
    }
}
