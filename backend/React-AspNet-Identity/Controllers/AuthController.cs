using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using React_AspNet_Identity.Data.Models;
using React_AspNet_Identity.Models;

namespace React_AspNet_Identity.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Login(AuthenticationRequest user)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        if (await _userManager.FindByNameAsync(user.UserName) is not { } foundUser)
            return BadRequest("Credentials are not valid");
        
        if (!await _userManager.CheckPasswordAsync(foundUser, user.Password))
            return BadRequest("Credentials are not valid");
        
        var claims = new List<Claim>
        {
            new (ClaimTypes.Email, foundUser.Email),
            new (ClaimTypes.Name, foundUser.UserName),
            new (ClaimTypes.Role, "User")
        };
        
        var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            AllowRefresh = true,
            IsPersistent = true,
            IssuedUtc = DateTimeOffset.UtcNow
        };
        
        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme, 
            new ClaimsPrincipal(claimsIdentity), 
            authProperties);
        
        return Ok();
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Register(User user)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userManager.CreateAsync(
            new ApplicationUser() { UserName = user.UserName, Email = user.Email },
            user.Password
        );
        
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        user.Password = null;
        return CreatedAtAction("GetUser", new { username = user.UserName }, user);
    }
    
    [Authorize]
    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }
    
    
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user == null)
            return NotFound();

        return Ok(new User
        {
            UserName = user.UserName,
            Email = user.Email
        });
    }
}