using Microsoft.EntityFrameworkCore;

namespace BookmarkManager.Data
{
    public class UserBookmarkContext : DbContext
    {
        private readonly string _connectionString;

        public UserBookmarkContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}