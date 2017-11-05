using System;

namespace backend.Shared
{
    public static class SicknessTypeExtensions
    {
        private static string[] sicknessNames = new string[] {
            "Unknown Sickness",
            "Bronchitis",
            "Cold",
            "Flu",
            "Norovirus",
            "Stomach Bug",
            "Whooping Cough",
        };
        public static string ToPrettyString(this SicknessType sicknessType)
        {
            /*
            if (!Enum.IsDefined(typeof(SicknessType), sicknessType))
            {
                sicknessType = SicknessType.UNKNOWN_SICKNESS;
            }
            */
            return sicknessNames[(int)sicknessType];
        }
    }
}