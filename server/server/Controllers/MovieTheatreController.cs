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
    public class MovieTheatreController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public MovieTheatreController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showMovieTheatreList()
        {
            var x = _context.MovieTheatres.ToList();
            return Ok(x);
        }

        public bool validate(MovieTheatre x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addMovieTheatre(MovieTheatre x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new MovieTheatre() { Address = x.Address };
            _context.MovieTheatres.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        //[HttpPut]
        //public IActionResult editMovieTheatre(MovieTheatre x)
        //{
        //    bool isValid = validate(x);
        //    if (!isValid)
        //    {
        //        return BadRequest("Duomenys nėra tinkami.");
        //    }

        //    var xToEdit = _context.MovieTheatres.FirstOrDefault(xToEdit => xToEdit.Id == xToEdit.Id);
        //    if (xToEdit == null)
        //    {
        //        return NotFound();
        //    }
        //    xToEdit.Address = x.Address;
        //    _context.SaveChanges();

        //    return Ok();
        //}

        [HttpDelete("{id}")]
        public IActionResult deleteMovieTheatre(int id)
        {
            var x = _context.MovieTheatres.FirstOrDefault(x => x.Id == id);
            if (x == null)
            {
                return BadRequest();
            }
            _context.MovieTheatres.Remove(x);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var x = _context.MovieTheatres.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}
