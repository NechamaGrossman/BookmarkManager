using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookmarkManager.Data
{
    public class UserBookmarkRepository
    {
        string _connectionString;
        public UserBookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Bookmark> GetBookmarks()
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                return context.Bookmarks.ToList();
            }
        }
        public void AddUser(User user, string password)
        {
            string hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using (var context = new UserBookmarkContext(_connectionString))
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

        }
        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isValidPassword)
            {
                return user;
            }
            return null;
        }
        public User GetByEmail(string email)
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                return context.Users.FirstOrDefault(u => u.Email == email);
            }
        }
        public bool EmailAvailable(string email)
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                bool isUsed = context.Users.Any(u => u.Email == email);
                return isUsed;
            }
        }
        public List<TopBookmark> GetTopBookMarkUrls()
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                return context.Bookmarks.GroupBy(b => b.URL)
                    .OrderByDescending(b => b.Count()).Take(5)
                    .Select(i => new TopBookmark
                    {
                        Url = i.First().URL,
                        Count = i.Count()
                    })
                    .ToList();
            }
        }
        public List<Bookmark> BookmarksForUser(string email)
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                User user = GetByEmail(email);
                return context.Bookmarks.Where(u => u.UserId==user.Id).ToList();
            }
        }
        public void UpdateBookmark(Bookmark bookmark)
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                context.Bookmarks.Attach(bookmark);
                context.Entry(bookmark).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void DeleteBookmark(Bookmark bookmark)
        {
            using (var context = new UserBookmarkContext(_connectionString))
            {
                context.Bookmarks.Remove(bookmark);
                context.SaveChanges();
            }
        }
    }




    public class TopBookmark
    {
        public string Url { get; set; }
        public int Count { get; set; }
    }
}
