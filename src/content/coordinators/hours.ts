interface CoordHour {
    Time: string;

    // in order: Monday, Tuesday, Wednesday, Thursday, Friday
    Coords: string[];
  }

  let CoordHours: CoordHour[] = [
    {
      Time: "10 - 11 AM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "11 AM - 12 PM",
      Coords: ["Matthew", "Mari", "Matthew", "Mari", ""],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["Lucas", "", "", "", ""],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["Lucas", "Leo", "Marko", "Leo", "Marko"],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["", "", "George", "Dhruv", "Jiamu"],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["", "", "George", "Dhruv", "Jiamu"],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["Ben", "Gil", "Gil", "Ishan", ""],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["Ben", "", "", "Ishan", ""],
    },
  ];

  export default CoordHours;
