using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_AspNet_Identity.Data.Models;

public class Books
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public ApplicationUser Author { get; set; }
}