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
      Coords: ["Mari", "Pusti", "Mari", "Leo", "Leo"],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["", "Pusti", "Oliver", "Gil", ""],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["Jiamu", "Jiamu", "Oliver", "Gil", ""],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["Ishan", "Ishan", "", "", ""],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["George", "Nico", "James", "Nico", "Ben"],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["George", "James", "James", "James", "Ben"],
    },
  ];

  export default CoordHours;
