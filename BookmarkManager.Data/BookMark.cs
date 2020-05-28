using System;
using System.Collections.Generic;
using System.Text;

namespace BookmarkManager.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public int UserId { get; set; }
    }
}
