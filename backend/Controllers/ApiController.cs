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
        //severity: 0-1
        public IActionResult SubmitSickness(double latitude, double longitude, float severity, SicknessType sicknessType)
        {
            //Verify data
            latitude = Math.Clamp(latitude, -180d, 180d);
            longitude = Math.Clamp(longitude, -180d, 180d); //what is actual lon range?
            severity = Math.Clamp(severity, 0f, 1f);
            if (!Enum.IsDefined(typeof(SicknessType), sicknessType))
            {
                sicknessType = SicknessType.UNKNOWN;
            }

            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            long epochTimestamp = (long)t.TotalSeconds;

            var report = new SicknessReportModel()
            {
                Timestamp = epochTimestamp,
                Latitute = latitude,
                Longitute = longitude,
                Severity = severity,
                Sickness = sicknessType,
            };

            return Json(report);
        }
        public IActionResult SicknessInArea(double lat1, double lon1, double lat2, double lon2)
        {
            return Json(new SicknessReportModel { Latitute = 31.4, Longitute = 12.8 });
        }
    }
}