export const COLOR_PALETTE: Record<
  "pH" | "oxygen" | "ppm" | "pm25" | "default",
  (data: number[]) => string[]
> = {
  pH: (data: number[]) => {
    return data.map((value) => {
      if (value >= 0 && value < 1) return "rgba(234, 28, 36, 1)";
      if (value >= 1 && value < 2) return "rgba(241, 105, 35, 1)";
      if (value >= 2 && value < 3) return "rgba(246, 141, 58, 1)";
      if (value >= 3 && value < 4) return "rgba(254, 190, 52, 1)";
      if (value >= 4 && value < 5) return "rgba(255, 243, 62, 1)";
      if (value >= 5 && value < 6) return "rgba(202, 219, 47, 1)";
      if (value >= 6 && value < 7) return "rgba(123, 194, 79, 1)";
      if (value >= 7 && value < 8) return "rgba(4, 177, 110, 1)";
      if (value >= 8 && value < 9) return "rgba(1, 170, 206, 1)";
      if (value >= 9 && value < 10) return "rgba(72, 116, 185, 1)";
      if (value >= 10 && value < 11) return "rgba(49, 71, 157, 1)";
      if (value >= 11 && value < 12) return "rgba(94, 62, 150, 1)";
      if (value >= 12 && value < 13) return "rgba(129, 49, 146, 1)";
      if (value >= 13 && value < 14) return "rgba(148, 93, 166, 1)";
      return "rgba(183, 102, 168, 1)"; // Default for 14+
    });
  },

  oxygen: (data: number[]) => {
    return data.map((value) => {
      if (value >= 0 && value < 4.1) return "rgba(225, 37, 37, 1)";
      if (value >= 4.1 && value < 6.6) return "rgba(255, 145, 49, 1)";
      if (value >= 6.6 && value < 9.6) return "rgba(194, 255, 82, 1)";
      return "rgba(0, 218, 7, 1)"; // Default for 9.6+
    });
  },

  ppm: (data: number[]) => {
    return data.map((value) => {
      if (value >= 0 && value < 50) return "rgba(37, 169, 225, 1)";
      if (value >= 50 && value < 100) return "rgba(26, 117, 187, 1)";
      if (value >= 100 && value < 200) return "rgba(46, 54, 144, 1)";
      if (value >= 200 && value < 300) return "rgba(142, 41, 143, 1)";
      if (value >= 300 && value < 400) return "rgba(214, 222, 33, 1)";
      if (value >= 400 && value < 500) return "rgba(243, 147, 25, 1)";
      return "rgba(236, 27, 36, 1)"; // Default for 500+
    });
  },

  pm25: (data: number[]) => {
    return data.map((value) => {
      if (value >= 0 && value < 9.1) return "rgba(65, 207, 69, 1)";
      if (value >= 9.1 && value < 35.5) return "rgba(103, 251, 117, 1)";
      if (value >= 35.5 && value < 55.5) return "rgba(165, 249, 109, 1)";
      if (value >= 55.5 && value < 125.5) return "rgba(255, 225, 73, 1)";
      if (value >= 125.5 && value < 225.5) return "rgba(255, 134, 59, 1)";
      return "rgba(204, 0, 0, 1)"; // Default for 225.5+
    });
  },
  default: (data: number[]) => data.map(() => "rgba(20, 184, 166, 1)"), // Teal for undefined sensors
};
