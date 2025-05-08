using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace blog.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly ApplicationDB _context;
    public BlogController(ApplicationDB context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.BlogPosts.OrderByDescending(p => p.Timestamp).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Post(BlogPost post)
    {
        post.Timestamp = DateTime.UtcNow;
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return Ok(post);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        return post.ContentType == "text/html" ? Ok(post) : BadRequest("Invalid content type");
    }


    }
}