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
        public IActionResult SubmitSickness()
        {
            return null;
        }
        public IActionResult SicknessInArea(double lat1, double lon1, double lat2, double lon2)
        {
            return Json(new SicknessModel { Latitute = 31.4, Longitute = 12.8 });
        }
    }
}