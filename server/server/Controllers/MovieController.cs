using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using server.Database;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public MovieController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> Get()
        {
            return await _context.Movies.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetById(int id)
        {
            return await _context.Movies.Where(m => m.Id == id).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> Add([FromForm] IFormFile file) 
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file);

            var newMovie = new Movie() { Title = movie.Title, Description = movie.Description, Duration = movie.Duration, StartDate = movie.StartDate, EndDate = movie.EndDate, Price = movie.Price, Icon = icon, Genre = movie.Genre };
            await _context.Movies.AddAsync(newMovie);
            await _context.SaveChangesAsync();
            return newMovie;
        }

        [HttpPut]
        public async Task<ActionResult<Movie>> Edit([FromForm] IFormFile file)
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file, movie.Icon);

            var movieToEdit = await _context.Movies.FirstOrDefaultAsync(mov => mov.Id == movie.Id);
       
            movieToEdit.Title = movie.Title;
            movieToEdit.Description = movie.Description;
            movieToEdit.Duration = movie.Duration;
            movieToEdit.StartDate = movie.StartDate;
            movieToEdit.EndDate = movie.EndDate;
            movieToEdit.Price = movie.Price;
            movieToEdit.Icon = icon;
            movieToEdit.Genre = movie.Genre;

            await _context.SaveChangesAsync();
            return movieToEdit;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(movie => movie.Id == id);
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return true;
        }


        [Route("SaveFile")]
        [HttpPost]
        public string SaveFile(IFormFile file, string oldfile=null)
        {
            try
            {
                if(file == null)
                {
                    return oldfile;
                }
                var postedFile = file;
                string physicalPath = "";
                if(oldfile=="default.jpg") 
                {
                    long filename = (long)(DateTime.Now - new DateTime(1970, 1, 1)).TotalMilliseconds;
                    physicalPath = _env.ContentRootPath + "/Photos/" + filename + ".jpg";
                }
                else
                {
                    physicalPath = _env.ContentRootPath + "/Photos/" + oldfile;
                }
                
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                int pos = physicalPath.LastIndexOf("/") + 1;
                return physicalPath.Substring(pos, physicalPath.Length - pos);
            }
            catch (Exception)
            {
                return "default.jpg";
            }
        }
    }
}
