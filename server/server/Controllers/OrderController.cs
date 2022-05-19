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
    public class OrderController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly DatabaseContext _context;

        public OrderController(IConfiguration configuration, IWebHostEnvironment env, DatabaseContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public IActionResult showCreateOrder()
        {
            var x = _context.OrderTables.ToList();
            return Ok(x);
        }
        //ar tikrai object, galbut reiks skirtingu dvieju validate
        public bool validate(Object x)
        {
            bool isNonNull = !(x == null);
            bool containsNullProperties = x.GetType().GetProperties()
            .Where(pi => pi.PropertyType == typeof(string))
            .Select(pi => (string)pi.GetValue(x))
            .Any(value => string.IsNullOrEmpty(value));
            return isNonNull && !containsNullProperties;
        }

        [HttpPost]
        public IActionResult addSnacks(OrderedSnack x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new OrderedSnack() { Amount = x.Amount, FkSnackId = x.FkSnackId, FkOrderTableId = x.FkOrderTableId };
            _context.OrderedSnacks.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult addOrder(OrderTable x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }

            var newX = new OrderTable() { OrderDate = x.OrderDate, IsPaid = x.IsPaid, AnswerDate = x.AnswerDate, FkClientId = x.FkClientId };
            _context.OrderTables.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        /*
               [HttpGet("{id}")]
               public IActionResult GetById(int id)
               {
                   var x = _context.OrderTables.Where(x => x.Id == id).FirstOrDefault();
                   if (x == null)
                   {
                       return BadRequest();
                   }
                   return Ok(x);
               }*/
    }
}
