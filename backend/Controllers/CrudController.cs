using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    public class CrudController : Controller
    {
        private readonly SickPlaceContext _context;

        public CrudController(SickPlaceContext context)
        {
            _context = context;
        }

        // GET: Crud
        public async Task<IActionResult> Index()
        {
            return View(await _context.SicknessReport.ToListAsync());
        }

        // GET: Crud/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sicknessReportModel = await _context.SicknessReport
                .SingleOrDefaultAsync(m => m.ID == id);
            if (sicknessReportModel == null)
            {
                return NotFound();
            }

            return View(sicknessReportModel);
        }

        // GET: Crud/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Crud/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Timestamp,Latitute,Longitute,Severity,Sickness")] SicknessReportModel sicknessReportModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sicknessReportModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(sicknessReportModel);
        }

        // GET: Crud/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sicknessReportModel = await _context.SicknessReport.SingleOrDefaultAsync(m => m.ID == id);
            if (sicknessReportModel == null)
            {
                return NotFound();
            }
            return View(sicknessReportModel);
        }

        // POST: Crud/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Timestamp,Latitute,Longitute,Severity,Sickness")] SicknessReportModel sicknessReportModel)
        {
            if (id != sicknessReportModel.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sicknessReportModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SicknessReportModelExists(sicknessReportModel.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(sicknessReportModel);
        }

        // GET: Crud/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sicknessReportModel = await _context.SicknessReport
                .SingleOrDefaultAsync(m => m.ID == id);
            if (sicknessReportModel == null)
            {
                return NotFound();
            }

            return View(sicknessReportModel);
        }

        // POST: Crud/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sicknessReportModel = await _context.SicknessReport.SingleOrDefaultAsync(m => m.ID == id);
            _context.SicknessReport.Remove(sicknessReportModel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SicknessReportModelExists(int id)
        {
            return _context.SicknessReport.Any(e => e.ID == id);
        }
    }
}
