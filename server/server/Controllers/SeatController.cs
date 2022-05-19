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
using TypeMerger;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public SeatController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showAddSeat()
        {
            var x = _context.Seats.ToList();
            return Ok(x);
        }

        [HttpGet("getData")]
        public IActionResult getData()
        {
            var x = _context.ChairTypes.ToList();

            return Ok(x);
        }

        public bool validate(Seat x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addSeat(List<List<Seat>> x)
        {
            bool isValid = true;
            foreach(var row in x)
            {
                foreach (var val in row)
                {
                    if (!validate(val))
                    {
                        return BadRequest();
                    }
                }
            }

            foreach (var row in x)
            {
                foreach (var val in row)
                {
                    var newX = new Seat() { Row = val.Row, Number = val.Number, FkMovieHallId = val.FkMovieHallId, FkChairTypeId = val.FkChairTypeId };
                    _context.Seats.Add(newX);
                }
            }
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult editSeat(Seat x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest("Duomenys nėra tinkami.");
            }

            var xToEdit = _context.Seats.FirstOrDefault(xToEdit => xToEdit.Id == xToEdit.Id);
            if (xToEdit == null)
            {
                return NotFound();
            }
            xToEdit.Row = x.Row;
            xToEdit.Number = x.Number;
            _context.SaveChanges();

            return Ok();
        }

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
            var x = _context.Seats.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}
