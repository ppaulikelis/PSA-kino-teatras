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
    public class SessionController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public SessionController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showSessionList()
        {
            var x = _context.Sessions.ToList();
            return Ok(x);
        }

        public bool validate(Session x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addSession(Session x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new Session() { StartTime = x.StartTime, FkMovieId = x.FkMovieId, FkMovieHallId = x.FkMovieHallId };
            _context.Sessions.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult editSession(Session x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest("Duomenys nėra tinkami.");
            }

            var xToEdit = _context.Sessions.FirstOrDefault(xToEdit => xToEdit.Id == xToEdit.Id);
            if (xToEdit == null)
            {
                return NotFound();
            }
            xToEdit.StartTime = x.StartTime;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult deleteSession(int id)
        {
            var x = _context.Sessions.FirstOrDefault(x => x.Id == id);
            if (x == null)
            {
                return BadRequest();
            }
            _context.Sessions.Remove(x);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var x = _context.Sessions.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}
