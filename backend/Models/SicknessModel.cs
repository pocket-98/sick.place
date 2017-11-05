using System;

namespace backend.Models
{
    public class SicknessModel
    {
        //Metadata from server
        public long Timestamp { get; set; }

        //Metadata from user
        public double Latitute { get; set; }
        public double Longitute { get; set; }

        //Sickness info from user
    }
}