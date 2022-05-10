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
        public List<Movie> showMovieList()
        {
            return _context.Movies.ToList();
        }

        [HttpGet("{id}")]
        public Movie GetById(int id)
        {
            return _context.Movies.Where(m => m.Id == id).FirstOrDefault();
        }

        [HttpPost]
        public Movie showAddMovie([FromForm] IFormFile file) 
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file);

            var newMovie = new Movie() { Title = movie.Title, Description = movie.Description, Duration = movie.Duration, StartDate = movie.StartDate, EndDate = movie.EndDate, Price = movie.Price, Icon = icon, Genre = movie.Genre };
            _context.Movies.Add(newMovie);
            _context.SaveChanges();
            return newMovie;
        }

        [HttpPut]
        public Movie showEditMovie([FromForm] IFormFile file)
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file, movie.Icon);

            var movieToEdit = _context.Movies.FirstOrDefault(mov => mov.Id == movie.Id);
       
            movieToEdit.Title = movie.Title;
            movieToEdit.Description = movie.Description;
            movieToEdit.Duration = movie.Duration;
            movieToEdit.StartDate = movie.StartDate;
            movieToEdit.EndDate = movie.EndDate;
            movieToEdit.Price = movie.Price;
            movieToEdit.Icon = icon;
            movieToEdit.Genre = movie.Genre;

            _context.SaveChanges();
            return movieToEdit;
        }

        [HttpDelete("{id}")]
        public Movie deleteMovie(int id)
        {
            var movie = _context.Movies.FirstOrDefault(movie => movie.Id == id);
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return movie;
        }

        [Route("SaveFile")]
        [HttpPost]
        public string SaveFile(IFormFile file, string oldfile="default.jpg")
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
