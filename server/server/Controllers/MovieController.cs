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
        public IActionResult showMovieList()
        {
            var movies = _context.Movies.ToList();
            if(movies.Count == 0)
            {
                return NotFound();
            }
            return Ok(movies);

            //var data = _context.Genres.Join(
            //    _context.Movies,
            //    genre => genre.Id,
            //    movie => movie.Genre,
            //    (genre, movie) => new
            //    {
            //        movie,
            //        GenreName = genre.Name

            //    }
            //).ToList();
        }

        public bool validate(Movie movie)
        {
            bool isNonNull = !(movie == null);
            bool containsNullProperties = movie.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(movie))
            .Any(value => string.IsNullOrEmpty(value));
            bool notDefaultImage = !movie.Icon.Equals("default.jpg");
            return isNonNull && !containsNullProperties && notDefaultImage;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var movie = _context.Movies.Where(m => m.Id == id).FirstOrDefault();
            if(movie == null)
            {
                return BadRequest("Duomenys nerasti pagal identifikatorių.");
            }
            return Ok(movie);
        }

        [HttpPost]
        public IActionResult showAddMovie([FromForm] IFormFile file) 
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file);
            movie.Icon = icon;

            bool isValid = validate(movie);
            if(!isValid)
            {
                return BadRequest("Duomenys nėra tinkami.");
            }

            var newMovie = new Movie() { Title = movie.Title, Description = movie.Description, Duration = movie.Duration, StartDate = movie.StartDate, EndDate = movie.EndDate, Price = movie.Price, Icon = movie.Icon, Genre = movie.Genre };
            _context.Movies.Add(newMovie);
            _context.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut]
        public IActionResult showEditMovie([FromForm] IFormFile file)
        {
            Movie movie = new Movie();
            foreach (var key in HttpContext.Request.Form.Keys)
            {
                var val = HttpContext.Request.Form[key];
                movie = JsonConvert.DeserializeObject<Movie>(val);
            }
            string icon = SaveFile(file, movie.Icon);
            movie.Icon = icon;

            bool isValid = validate(movie);
            if (!isValid)
            {
                return BadRequest("Duomenys nėra tinkami.");
            }

            var movieToEdit = _context.Movies.FirstOrDefault(mov => mov.Id == movie.Id);
            if(movieToEdit == null)
            {
                return NotFound();
            }
            movieToEdit.Title = movie.Title;
            movieToEdit.Description = movie.Description;
            movieToEdit.Duration = movie.Duration;
            movieToEdit.StartDate = movie.StartDate;
            movieToEdit.EndDate = movie.EndDate;
            movieToEdit.Price = movie.Price;
            movieToEdit.Icon = icon;
            movieToEdit.Genre = movie.Genre;

            _context.SaveChanges();
            return Ok(movieToEdit);
        }

        [HttpDelete("{id}")]
        public IActionResult deleteMovie(int id)
        {
            var movie = _context.Movies.FirstOrDefault(movie => movie.Id == id);
            if(movie == null)
            {
                return BadRequest("Netinkami duomenys trynimui pagal identifikatorių.");
            }
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok(movie);
        }

        //[HttpGet]
        //public IActionResult getClients()
        //{

        //}

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
