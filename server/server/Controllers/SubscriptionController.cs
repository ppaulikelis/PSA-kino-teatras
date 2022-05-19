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
    public class SubscriptionController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public SubscriptionController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showSubscribe()
        {
            var x = _context.Subscriptions.ToList();
            return Ok(x);
        }

        public bool validate(Genre x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost("{genre}/{id}")]
        public IActionResult addSubscription(int genre, int id)
        {
            var g = _context.Genres.Where(g => g.Id == genre).FirstOrDefault();
            bool isValid = validate(g);
            if (!isValid)
            {
                return BadRequest();
            }

            var c = _context.Clients.Where(c => c.Id == id).FirstOrDefault();
            c.FavouriteGenre = genre;
            _context.SaveChanges();

            return Ok();
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var x = _context.Subscriptions.Where(x => x.Id == id).FirstOrDefault();
            if (x == null)
            {
                return BadRequest();
            }
            return Ok(x);
        }
    }
}
