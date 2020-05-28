using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BookmarkManager.Data
{
    public class UserBookmarkContextFactory : IDesignTimeDbContextFactory<UserBookmarkContext>
    {
        public UserBookmarkContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}BookmarkManager.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new UserBookmarkContext(config.GetConnectionString("ConStr"));
        }
    }
}