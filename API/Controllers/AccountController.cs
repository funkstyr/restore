using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
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

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;

                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            var token = await _tokenService.GenerateToken(user);
            var cookieOptions = new CookieOptions { IsEssential = true, HttpOnly = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("token", token, cookieOptions);

            return new UserDto
            {
                Email = user.Email,
                Token = token,
                Username = user.UserName,
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket.MapBasketToDto()
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
                Token = token,
                Username = user.UserName
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
            }

            return await _context.Baskets
                    .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                    .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
        }
    }
}