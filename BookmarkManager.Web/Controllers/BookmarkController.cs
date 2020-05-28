using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookmarkManager.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetTopBookmarks")]
        public List<TopBookmark> GetTopBookmarks()
        {
            var repos = new UserBookmarkRepository(_connectionString);
            return repos.GetTopBookMarkUrls();
        }
        [HttpGet]
        [Route("getbookmarksforuser")]
        public List<Bookmark> GetBookMarksForUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserBookmarkRepository(_connectionString);
            return repo.BookmarksForUser(User.Identity.Name);
        }

        [HttpPost]
        [Route("EditBookMark")]
        public void EditBookMark(Bookmark bookmark)
        {
            var repo = new UserBookmarkRepository(_connectionString);
            bookmark.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.UpdateBookmark(bookmark);
        }
        [HttpPost]
        [Route("DeleteBookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var repo = new UserBookmarkRepository(_connectionString);
            repo.DeleteBookmark(bookmark);
        }
    }
}