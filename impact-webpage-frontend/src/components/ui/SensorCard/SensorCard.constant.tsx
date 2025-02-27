const COLOR_PALETTE_SENSOR_CARD: Record<
  "pH" | "oxygen" | "ppm" | "pm25" | "default",
  (data: number) => string
> = {
  pH: (data: number) => {
    if (data >= 0 && data < 1) return "rgba(234, 28, 36, 1)";
    else if (data >= 1 && data < 2) return "rgba(241, 105, 35, 1)";
    else if (data >= 2 && data < 3) return "rgba(246, 141, 58, 1)";
    else if (data >= 3 && data < 4) return "rgba(254, 190, 52, 1)";
    else if (data >= 4 && data < 5) return "rgba(255, 243, 62, 1)";
    else if (data >= 5 && data < 6) return "rgba(202, 219, 47, 1)";
    else if (data >= 6 && data < 7) return "rgba(123, 194, 79, 1)";
    else if (data >= 7 && data < 8) return "rgba(4, 177, 110, 1)";
    else if (data >= 8 && data < 9) return "rgba(1, 170, 206, 1)";
    else if (data >= 9 && data < 10) return "rgba(72, 116, 185, 1)";
    else if (data >= 10 && data < 11) return "rgba(49, 71, 157, 1)";
    else if (data >= 11 && data < 12) return "rgba(94, 62, 150, 1)";
    else if (data >= 12 && data < 13) return "rgba(129, 49, 146, 1)";
    else if (data >= 13 && data < 14) return "rgba(148, 93, 166, 1)";
    else if (data >= 14) return "rgba(183, 102, 168, 1)";
    else return "rgba(0, 0, 0, 1)"; // Default (if pH] is out of range)
  },

  // Dissolved Oxygen dataset colors
  oxygen: (data: number) => {
    if (data >= 0 && data < 4.1) {
      return "rgba(225, 37, 37, 1)"; // Red (Very Low oxygen)
    } else if (data >= 4.1 && data < 6.6) {
      return "rgba(255, 145, 49, 1)"; // Orange (Low oxygen)
    } else if (data >= 6.6 && data < 9.6) {
      return "rgba(194, 255, 82, 1)"; // Green-Yellow (Moderate oxygen)
    } else if (data >= 9.6) {
      return "rgba(0, 218, 7, 1)"; // Green (Good oxygen)
    } else {
      return "rgba(0, 0, 0, 1)"; // Default Black (Invalid Value)
    }
  },

  // Dissolved Solid dataset colors
  ppm: (data: number) => {
    if (data >= 0 && data < 50) return "rgba(37, 169, 225, 1)";
    else if (data >= 50 && data < 100) return "rgba(26, 117, 187, 1)";
    else if (data >= 100 && data < 200) return "rgba(46, 54, 144, 1)";
    else if (data >= 200 && data < 300) return "rgba(142, 41, 143, 1)";
    else if (data >= 300 && data < 400) return "rgba(214, 222, 33, 1)";
    else if (data >= 400 && data < 500) return "rgba(243, 147, 25, 1)";
    else if (data >= 500) return "rgba(236, 27, 36, 1)";
    else return "rgba(0, 0, 0, 1)"; // Default color for invalid values
  },

  // PM25 dataset colors
  pm25: (data: number) => {
    if (data >= 0 && data < 9.1) return "rgba(65, 207, 69, 1)";
    else if (data >= 9.1 && data < 35.5) return "rgba(103, 251, 117, 1)";
    else if (data >= 35.5 && data < 55.5) return "rgba(165, 249, 109, 1)";
    else if (data >= 55.5 && data < 125.5) return "rgba(255, 225, 73, 1)";
    else if (data >= 125.5 && data < 225.5) return "rgba(255, 134, 59, 1)";
    else if (data >= 225) return "rgba(204, 0, 0, 1)";
    else return "rgba(0, 0, 0, 1)"; // Default color for invalid values
  },

  default: (data: number) => "rgba(20, 184, 166, 1)",
};

const INDICATOR_TEXT: Record<
  "pH" | "oxygen" | "ppm" | "pm25",
  (data: number) => string
> = {
  pH: (data: number) => {
    if (data >= 0 && data < 3) {
      return "Highly Acidic";
    } else if (data >= 3 && data < 7) {
      return "Slightly Acidic";
    } else if (data >= 7 && data < 8) {
      return "Neutral";
    } else if (data >= 8 && data < 13) {
      return "Slightly Alkaline";
    } else if (data >= 13) {
      return "Highly Alkaline";
    } else {
      return "No Data";
    }
  },
  oxygen: (data: number) => {
    if (data >= 0 && data < 4.1) {
      return "No live";
    } else if (data >= 4.1 && data < 6.6) {
      return "Few live";
    } else if (data >= 6.6 && data < 9.6) {
      return "Most live";
    } else if (data >= 9.6) {
      return "All live";
    } else {
      return "No Data";
    }
  },
  ppm: (data: number) => {
    if (data >= 0 && data < 50) {
      return "Ideal drinking water";
    } else if (data >= 50 && data < 100) {
      return "Good quality water";
    } else if (data >= 100 && data < 200) {
      return "Hard water";
    } else if (data >= 200 && data < 300) {
      return "Marginally acceptable";
    } else if (data >= 300 && data < 400) {
      return "High TDS water";
    } else if (data >= 400 && data < 500) {
      return "Poor quality";
    } else if (data >= 500) {
      return "Undrinkable";
    } else {
      return "No Data";
    }
  },
  pm25: (data: number) => {
    if (data >= 0 && data < 9.1) {
      return "Good";
    } else if (data >= 9.1 && data < 35.5) {
      return "Moderate";
    } else if (data >= 35.5 && data < 55.5) {
      return "Unhealthy for several groups";
    } else if (data >= 55.5 && data < 125.5) {
      return "Unhealthy";
    } else if (data >= 125.5 && data < 225.5) {
      return "Very unhealthy";
    } else if (data >= 225.5) {
      return "Hazardous";
    } else {
      return "No Data";
    }
  },
};

export { COLOR_PALETTE_SENSOR_CARD, INDICATOR_TEXT };
