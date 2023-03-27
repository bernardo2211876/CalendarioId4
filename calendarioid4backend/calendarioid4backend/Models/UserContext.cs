namespace calendarioid4backend.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Utilizador> Users { get; set;}
    }

}
