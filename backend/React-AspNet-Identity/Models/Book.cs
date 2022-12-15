using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace React_AspNet_Identity.Models;

public class Book
{
    [Required] [JsonPropertyName("title")] 
    public string Title { get; set; }
    
    [Required] [JsonPropertyName("author_username")]
    public string AuthorUsername { get; set; }
}