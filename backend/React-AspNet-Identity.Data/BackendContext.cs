using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using React_AspNet_Identity.Data.Models;

namespace React_AspNet_Identity.Data;

public class BackendContext : IdentityUserContext<ApplicationUser>
{
    public BackendContext (DbContextOptions<BackendContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    public DbSet<Books> Books { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // ...
    }
}