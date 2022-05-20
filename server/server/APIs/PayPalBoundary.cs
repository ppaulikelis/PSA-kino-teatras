using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace server.APIs
{
    public static class PayPalBoundary
    {
        public static DateTime? passPayment(dynamic data)
        {
            DateTime? status = DateTime.Now;
            return status;
        }
    }
}
