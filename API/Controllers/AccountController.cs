using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var token = await _tokenService.GenerateToken(user);
            var cookieOptions = new CookieOptions { IsEssential = true, HttpOnly = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("token", token, cookieOptions);

            return new UserDto
            {
                Email = user.Email,
                Token = token
            };
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // possible to use cookie or bearer?
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var token = await _tokenService.GenerateToken(user);
            var cookieOptions = new CookieOptions { IsEssential = true, HttpOnly = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("token", token, cookieOptions);

            return new UserDto
            {
                Email = user.Email,
                Token = token
            };
        }
    }
}