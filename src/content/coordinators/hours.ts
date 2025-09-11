interface CoordHour {
    Time: string;

    // in order: Monday, Tuesday, Wednesday, Thursday, Friday
    Coords: string[];
  }

  let CoordHours: CoordHour[] = [
    {
      Time: "10 - 11 AM",
      Coords: ["Rahul", "", "Anna", "", "Anna"],
    },
    {
      Time: "11 AM - 12 PM",
      Coords: ["Emily", "Oliver", "Rahul", "Ben", ""],
    },
    {
      Time: "12 - 1 PM",
      Coords: ["Pusti", "Oliver", "Ishan", "Mari", "Ishan"],
    },
    {
      Time: "1 - 2 PM",
      Coords: ["George", "Jiamu", "", "Jiamu", "George"],
    },
    {
      Time: "2 - 3 PM",
      Coords: ["", "", "Ben", "Sam", ""],
    },
    {
      Time: "3 - 4 PM",
      Coords: ["Mari", "", "Nico", "Sam", ""],
    },
    {
      Time: "4 - 5 PM",
      Coords: ["Emily", "", "Nico", "", ""],
    },
    {
      Time: "5 - 6 PM",
      Coords: ["", "Pusti", "", "", ""],
    },
  ];

  export default CoordHours;
