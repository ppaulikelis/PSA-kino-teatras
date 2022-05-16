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
    public class ChairTypeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public ChairTypeController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showChairTypeList()
        {
            var x = _context.ChairTypes.ToList();
            return Ok(x);
        }


        public bool validate(ChairType x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addChairType(ChairType x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new ChairType() { Title = x.Title, Price = x.Price };
            _context.ChairTypes.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult deleteChairType(int id)
        {
            var x = _context.ChairTypes.FirstOrDefault(x => x.Id == id);
            if (x == null)
            {
                return BadRequest();
            }
            _context.ChairTypes.Remove(x);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var x = _context.ChairTypes.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}