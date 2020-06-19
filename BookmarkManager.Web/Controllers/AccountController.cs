using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase 
    {
        string _connectionString;
        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        
        [HttpPost]
        [Route("SignUp")]
        public void SignUp(SignupViewModel signupViewModel)
        {
            var repos = new UserBookmarkRepository(_connectionString);
            repos.AddUser(signupViewModel, signupViewModel.Password);
        }

        [HttpPost]
        [Route("Login")]
        public User Login(LoginViewModel loginViewModel)
        {
            var repos = new UserBookmarkRepository(_connectionString);
            User login = repos.Login(loginViewModel.Email, loginViewModel.Password);
            if (login == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim("user", loginViewModel.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return login;
        }

        [HttpGet]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserBookmarkRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
    }
}

