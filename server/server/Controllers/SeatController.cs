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
        public IActionResult editSeat(List<List<Seat>> x)
        {
            bool isValid = true;
            foreach (var row in x)
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
                    var xToEdit = _context.Seats.FirstOrDefault(xToEdit => xToEdit.Id == val.Id);
                    if (xToEdit == null)
                    {
                        return NotFound();
                    }
                    xToEdit.Row = val.Row;
                    xToEdit.Number = val.Number;
                    xToEdit.FkChairTypeId = val.FkChairTypeId;
                }
            }
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("{hallid}")]
        public IActionResult GetById(int hallid)
        {
            var x = _context.Seats.Where(x => x.FkMovieHallId == hallid).ToList();
            if (x == null)
            {
                return BadRequest();
            }

            var result = x
                .OrderBy(o => o.Row)
                .GroupBy(x => x.Row)
                .Select(chunk => chunk.OrderBy(o => o.Number).ToArray())
                .ToArray();

            return Ok(result);
        }
    }
}
