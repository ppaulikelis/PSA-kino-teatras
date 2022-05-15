using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    public class SnacksController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
