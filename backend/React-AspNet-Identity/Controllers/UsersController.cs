using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using React_AspNet_Identity.Data.Models;
using React_AspNet_Identity.Models;

namespace React_AspNet_Identity.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> PostUser(User user)
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
    
    [HttpGet("{username}")]
    public async Task<IActionResult> GetUser(string username)
    {
        var user = await _userManager.FindByNameAsync(username);

        if (user == null)
            return NotFound();

        return Ok(new User
        {
            UserName = user.UserName,
            Email = user.Email
        });
    }
}