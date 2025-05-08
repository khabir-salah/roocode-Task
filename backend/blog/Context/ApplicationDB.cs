using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog.Data;
using Microsoft.EntityFrameworkCore;

namespace blog.Context
{
    public class ApplicationDB : DbContext
    {
        public ApplicationDB(DbContextOptions<ApplicationDB> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
    }
}