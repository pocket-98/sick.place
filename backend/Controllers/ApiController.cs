using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    public class ApiController : Controller
    {
        public IActionResult SicknessInArea(double lat1, double lon1, double lat2, double lon2)
        {
            return Content("lat1=" + lat1);
        }
    }
}