using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace React_AspNet_Identity.Models;

public class AuthenticationRequest
{
    [Required] [JsonPropertyName("username")]
    public string UserName { get; set; }
    [Required] [JsonPropertyName("password")]
    public string Password { get; set; }
}