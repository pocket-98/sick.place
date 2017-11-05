using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Shared;

namespace backend.Controllers
{
    public class ApiController : Controller
    {
        private readonly SickPlaceContext _context;

        public ApiController(SickPlaceContext context)
        {
            _context = context;
        }

        //severity: 0-1
        public async Task<IActionResult> SubmitReport(double latitude, double longitude, float severity, SicknessType sicknessType)
        {
            //TODO: remove this in prod
            latitude += Fudge();
            longitude += Fudge();

            //Verify data
            latitude = Math.Clamp(latitude, -180d, 180d);
            longitude = Math.Clamp(longitude, -180d, 180d); //what is actual lon range?
            severity = Math.Clamp(severity, 0f, 1f);
            if (!Enum.IsDefined(typeof(SicknessType), sicknessType))
            {
                sicknessType = SicknessType.UNKNOWN_SICKNESS;
            }

            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            long epochTimestamp = (long)t.TotalSeconds;

            var report = new SicknessReportModel()
            {
                Timestamp = epochTimestamp,
                Latitude = latitude,
                Longitude = longitude,
                Severity = severity,
                Sickness = sicknessType,
            };

            //Store report
            if (ModelState.IsValid)
            {
                _context.Add(report);
                await _context.SaveChangesAsync();
                //return RedirectToAction(nameof(Index)); TODO: redirect?
                return Json(new {Success = false, Message = "Sickness reported. Thanks!"});
                //return Content("saved report to db");
            }

            return Json(new {Success = false, Message = "Uh oh, sickness report failed!"});
        }

        //p1 is lower left, p2 is upper right
        public IActionResult SicknessInArea(double lat1, double lon1, double lat2, double lon2)
        {
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            long epochTimestamp = (long)t.TotalSeconds;

            var sicknesses =  _context.SicknessReport.Where(report =>
                report.Latitude > lat1
                && report.Latitude < lat2
                && report.Longitude > lon1
                && report.Longitude < lon2
                && epochTimestamp - report.Timestamp < 3600 * 24 * 14 * report.Severity*report.Severity
                );

            return Json(sicknesses);
        }

        private double Fudge()
        {
            var r = new Random();
            return ((r.NextDouble()*2)-1) * 0.005;
        }
    }
}