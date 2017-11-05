using System;
using backend.Shared;

namespace backend.Models
{
    public class SicknessReportModel
    {
        //Required for DB id column?
        public int ID { get; set; }

        //Metadata from server
        public long Timestamp { get; set; }

        //Metadata from user
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        //Sickness info from user
        public float Severity { get; set; }
        public SicknessType Sickness { get; set; }

        public string SicknessName
        {
            get
            {
                return Sickness.ToPrettyString();
            }
        }
    }
}