using Microsoft.AspNetCore.Identity;

namespace React_AspNet_Identity.Data.Models;

public class ApplicationUser : IdentityUser
{
    public string? UniqueData { get; set; }
}