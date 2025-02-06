interface CoordHour {
  Time: string;

  // in order: Monday, Tuesday, Wednesday, Thursday, Friday
  Coords: string[];
}

let CoordHours: CoordHour[] = [
  {
    Time: "10 - 11 AM",
    Coords: ["George", "", "Sam", "", ""],
  },
  {
    Time: "11 AM - 12 PM",
    Coords: ["Pusti", "Nico", "Sam", "Nico", "Anna"],
  },
  {
    Time: "12 - 1 PM",
    Coords: ["Pusti", "Jiamu", "Mari", "Jiamu", "Anna"],
  },
  {
    Time: "1 - 2 PM",
    Coords: ["", "Emily", "Rahul", "Emily", "Michael"],
  },
  {
    Time: "2 - 3 PM",
    Coords: ["", "", "", "", "Michael"],
  },
  {
    Time: "3 - 4 PM",
    Coords: ["Oliver", "", "", "", "Rahul"],
  },
  {
    Time: "4 - 5 PM",
    Coords: ["Oliver", "", "Ishan", "", "Ishan"],
  },
  {
    Time: "5 - 6 PM",
    Coords: ["George", "", "", "", "Mari"],
  },
];

export default CoordHours;
