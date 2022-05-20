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
using server.APIs;

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
            return Ok(movies);
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
                return BadRequest();
            }
            return Ok(movie);
        }

        [HttpPost]
        public IActionResult addMovie([FromForm] IFormFile file) 
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
                return BadRequest();
            }

            var newMovie = new Movie() { Title = movie.Title, Description = movie.Description, Duration = movie.Duration, StartDate = movie.StartDate, EndDate = movie.EndDate, Price = movie.Price, Icon = movie.Icon, Genre = movie.Genre };
            _context.Movies.Add(newMovie);
            _context.SaveChanges();


            var clients = _context.Clients.Where(client => client.FavouriteGenre != null);
            if(clients != null)
            {
                formSubscription(newMovie);
            }

            return Ok();
        }

        [HttpPut]
        public IActionResult editMovie([FromForm] IFormFile file)
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
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult deleteMovie(int id)
        {
            var movie = _context.Movies.FirstOrDefault(movie => movie.Id == id);
            if(movie == null)
            {
                return BadRequest();
            }
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();
        }

        public IActionResult formSubscription(Movie movie)
        {
            var data = _context.Clients.Join(
                _context.Users,
                client => client.FkUserId,
                user => user.Id,
                (client, user) => new
                {
                    Genre = client.FavouriteGenre,
                    Recipient = user.Email,
                    Text = "Išleistas naujas Jūsų mėgstamo žanro filmas: " + movie.Title,
                    Sender = "KTVS@gmail.com",
                }
            ).Where(x => x.Genre == movie.Genre).ToList();

            _context.Subscriptions.Add(new Subscription(null, null, movie.Id));
            _context.SaveChanges();

            Subscription sub = _context.Subscriptions.Where(sub => sub.FkMovieId == movie.Id).FirstOrDefault();
            sub.Id = sub.Id;
            sub.IsSent = false;
            sub.AnswerDate = null;
            _context.SaveChanges();

            //EMAIL SERVER API
            var status = EmailBoundary.send(data);

            return Ok();
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
