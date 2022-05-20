using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.APIs
{
    public static class EmailBoundary
    {
        public static bool send(dynamic subscription)
        {
            return true;
        }

        async static Task<bool> send(OrderTable data)
        {
            await Task.Delay(1000);
            return true;
        }
    }
}
