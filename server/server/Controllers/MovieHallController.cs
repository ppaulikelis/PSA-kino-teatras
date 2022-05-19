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
    public class MovieHallController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public MovieHallController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showMovieHallList()
        {
            var x = _context.MovieHalls.ToList();
            return Ok(x);
        }

        [Route("api/[controller]/movieTheatres")]
        [HttpGet]
        public IActionResult getMovieTheatres(int id)
        {
            var x = _context.MovieTheatres.Where(x => x.Id == id).ToList();
            return Ok(x);
        }

        public bool validate(MovieHall x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addMovieHall(MovieHall x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new MovieHall() { Number = x.Number, FkMovieTheatreId = x.FkMovieTheatreId };
            _context.MovieHalls.Add(newX);
            _context.SaveChanges();

            return Ok(newX.Id);
        }

        [HttpPut]
        public IActionResult editMovieHall(MovieHall x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest("Duomenys nėra tinkami.");
            }

            var xToEdit = _context.MovieHalls.FirstOrDefault(xToEdit => xToEdit.Id == x.Id);
            if (xToEdit == null)
            {
                return NotFound();
            }

            xToEdit.Number = x.Number;
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult deleteMovieHall(int id)
        {
            var x = _context.MovieHalls.FirstOrDefault(x => x.Id == id);
            if (x == null)
            {
                return BadRequest();
            }
            _context.MovieHalls.Remove(x);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var x = _context.MovieHalls.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}
