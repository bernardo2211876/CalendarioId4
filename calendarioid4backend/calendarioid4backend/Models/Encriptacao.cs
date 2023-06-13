using System.Text;

namespace calendarioid4backend.Models
{
    public class Encriptacao
    {

        public static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("Password cannot be null or empty.");
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return hashedPassword;
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hashedPassword))
            {
                return false;
            }

            bool passwordMatches = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            return passwordMatches;
        }
    }
}
