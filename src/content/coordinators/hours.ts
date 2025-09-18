interface CoordHour {
    Time: string;

    // in order: Monday, Tuesday, Wednesday, Thursday, Friday
    Coords: string[];
  }

  let CoordHours: CoordHour[] = [
    {
      Time: "10 - 11 AM",
      Coords: ["Rahul", "Oliver", "Anna", "Oliver", "Anna"],
    },
    {
      Time: "11 AM - 12 PM",
      Coords: ["Emily", "Nico", "Rahul", "Nico", ""],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["Pusti", "", "Ishan", "Mari", "Ishan"],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["George", "Jiamu", "Ben", "Jiamu", "George"],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["", "Sam", "Ben", "", ""],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["Mari", "Sam", "", "", ""],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["Emily", "", "", "", ""],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["", "Pusti", "", "", ""],
    },
  ];

  export default CoordHours;
