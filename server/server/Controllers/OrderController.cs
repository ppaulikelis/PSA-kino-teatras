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

        [HttpGet("getOrder/{id}")]
        public IActionResult showViewOrder(int id)
        {
            var tickets = _context.Tickets.Where(t => t.FkOrderTableId == id)
            .Join(
            _context.Sessions,
            ticket => ticket.FkSessionId,
            session => session.Id,
            (ticket, session) => new { ticket, session }
            )
            .Join(
            _context.Movies,
            ticketsession => ticketsession.session.FkMovieId,
            movie => movie.Id,
            (ticketsession, movie) => new {ticketsession, movie} 
            )
            .Join(
            _context.Seats,
            ticketsessionmovie => ticketsessionmovie.ticketsession.ticket.FkSeatId,
            seat => seat.Id,
            (ticketmoviesession, seat) => new {ticketmoviesession, seat}
            )
            .Join(
            _context.ChairTypes,
            ticketmoviesessionseat => ticketmoviesessionseat.seat.FkChairTypeId,
            chairtype => chairtype.Id,
            (ticketmoviesessionseat, chairtype) => new 
            {
               Title = ticketmoviesessionseat.ticketmoviesession.movie.Title,
               StartTime = ticketmoviesessionseat.ticketmoviesession.ticketsession.session.StartTime,
               Price = ticketmoviesessionseat.ticketmoviesession.movie.Price + chairtype.Price,
               ChairType = chairtype.Title,
               Row = ticketmoviesessionseat.seat.Row,
               Number = ticketmoviesessionseat.seat.Number,
            }
            )
            .ToList();

            var snacks = _context.OrderedSnacks.Where(t => t.FkOrderTableId == id)
            .Join(
            _context.Snacks,
            os => os.FkSnackId,
            snack => snack.Id,
            (os, snack) => new { os, snack }
            )
            .Join(
            _context.SnackTypes,
            ossnack => ossnack.snack.Type,
            type => type.Id,
            (ossnack, type) => new { ossnack, type }
            )
            .Join(
            _context.Sizes,
            ossnacktype => ossnacktype.ossnack.snack.Size,
            size => size.Id,
            (ossnacktype, size) => new
            {
                Title = ossnacktype.ossnack.snack.Title,
                Type = ossnacktype.type.Name,
                Count = ossnacktype.ossnack.os.Amount,
                Price = ossnacktype.ossnack.snack.Price * ossnacktype.ossnack.os.Amount,
                Size = size.Name
            }).ToList();

            return Ok(new { tickets, snacks});
        }

        [HttpGet("getMovies")]
        public IActionResult showBuyTickets()
        {
            var x = _context.Movies.ToList();
            return Ok(x);
        }

        [HttpGet("getSessions")] 
        public IActionResult getSessions()
        {
            var x = _context.Sessions.ToList();
            return Ok(x);
        }
       
        [HttpGet("getSnacks")]
        public IActionResult getSnacks()
        {
            var x = _context.Snacks.ToList();
            return Ok(x);
        }

        [HttpGet("getOrderedSnacks")]
        public IActionResult openBuySnacks()
        {
            var x = _context.OrderedSnacks.ToList();
            return Ok(x);
        }

        [HttpGet("getSeats")]
        public IActionResult getSeats()
        {
            var seats = _context.Sessions
            .Join(
            _context.MovieHalls,
            session => session.FkMovieHallId,
            hall => hall.Id,
            (session, hall) => new { session, hall }
            )
            .Join(
            _context.Seats,
            sessionhall => sessionhall.hall.Id,
            seat => seat.FkMovieHallId,
            (sessionhall, seat) => new
            {
                Row = seat.Row,
                Number = seat.Number,
                Id = seat.Id,
                FkMovieHallId = seat.FkMovieHallId,
                FkChairTypeId = seat.FkChairTypeId
            }
            )
            .ToList();

            var result = seats
              .OrderBy(o => o.Row)
              .GroupBy(x => x.Row)
              .Select(chunk => chunk.OrderBy(o => o.Number).ToArray())
              .ToArray();

            return Ok(result);
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

        [HttpPost("addTicket")]
        public IActionResult addTicket(Ticket x)
        {
            bool isValid = validate(x);
            if (!isValid)
            {
                return BadRequest();
            }
            var newX = new Ticket() {  FkOrderTableId = x.FkOrderTableId, FkSeatId = x.FkSeatId, FkSessionId = x.FkSessionId };
            _context.Tickets.Add(newX);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("addSnacks")]
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

        [HttpPost("addOrder")]
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

            return Ok(newX.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult deleteOrder(int id)
        {
            var x = _context.OrderTables.FirstOrDefault(x => x.Id == id);
            if (x == null)
            {
                return BadRequest();
            }
            _context.OrderTables.Remove(x);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult confirmed(int id)
        {
            var order = _context.OrderTables.Where(o => o.Id == id).FirstOrDefault();

            order.IsPaid = false;
            _context.SaveChanges();

            DateTime? status = PayPalBoundary.passPayment(order);
            if(status == null)
            {
                order.AnswerDate = null;
                _context.SaveChanges();
                return StatusCode(424);
            }
            else
            {
                order.AnswerDate = status;
                order.IsPaid = true;
                _context.SaveChanges();
                var result = formEmailRequests(order).Result;
                return Ok(result);
            }
        }

        async private Task<Object> formEmailRequests(OrderTable order)
        {
            var task1 = GetOrderData(order.Id);
            var task2 = SendEmail(order);
            var posts = await Task.WhenAll(task1, task2);
            var post1 = posts[0];
            var post2 = posts[1];
            return Ok(new { post1, post2 });
        }

        async private Task<IActionResult> GetOrderData(int id)
        {
            var order = await _context.OrderTables.Where(o => o.Id == id).FirstOrDefaultAsync();
            return Ok(order);
        }
        async private Task<IActionResult> SendEmail(OrderTable order)
        {
            return Ok(EmailBoundary.send(order));
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
