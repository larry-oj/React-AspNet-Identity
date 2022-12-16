using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_AspNet_Identity.Data;
using React_AspNet_Identity.Data.Models;
using React_AspNet_Identity.Models;

namespace React_AspNet_Identity.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private readonly BackendContext _context;
    
    public BooksController(BackendContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetBooks()
    {
        return Ok(_context.Books.Include(b => b.Author).ToList().Select(x => new Book
        {
            Title = x.Title,
            AuthorUsername = x.Author.UserName
        }));
    }
    
    [HttpGet]
    [Route("{title}")]
    public IActionResult GetBook(string title)
    {
        var book = _context.Books.Include(b => b.Author).FirstOrDefault(x => x.Title == title);
        if (book == null)
            return NotFound();
        
        return Ok(new Book
        {
            Title = book.Title,
            AuthorUsername = book.Author.UserName
        });
    }
    
    [HttpPost]
    public async Task<IActionResult> PostBook(Book book)
    {
        var author = await _context.Users.FirstOrDefaultAsync(x => x.UserName == book.AuthorUsername);
        if (author == null)
            return BadRequest("Author not found");
        
        _context.Books.Add(new Books {Title = book.Title, Author = author});
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetBook", new {title = book.Title}, book);
    }
}