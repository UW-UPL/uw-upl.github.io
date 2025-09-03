interface CoordHour {
    Time: string;

    // in order: Monday, Tuesday, Wednesday, Thursday, Friday
    Coords: string[];
  }

  let CoordHours: CoordHour[] = [
    {
      Time: "10 - 11 AM",
      Coords: ["Rahul", "Jiamu", "Anna", "", "Anna"],
    },
    {
      Time: "11 AM - 12 PM",
      Coords: ["Rahul", "Oliver", "", "Ben", "Sam"],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["Pusti", "Oliver", "Ishan", "Mari", "Ishan"],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["George", "Jiamu", "Ben", "Jiamu", "George"],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["", "Emily", "Nico", "Emily", ""],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["Mari", "", "Nico", "", ""],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["", "", "", "", ""],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["", "Pusti", "", "", ""],
    },
  ];

  export default CoordHours;
