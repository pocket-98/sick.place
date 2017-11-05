using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class SickPlaceContext : DbContext
    {
        public SickPlaceContext (DbContextOptions<SickPlaceContext> options)
            : base(options)
        {
        }

        public DbSet<backend.Models.SicknessReportModel> SicknessReport { get; set; }
    }
}