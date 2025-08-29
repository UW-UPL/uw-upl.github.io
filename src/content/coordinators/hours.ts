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
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["", "", "", "", ""],
    },
  ];

  export default CoordHours;
