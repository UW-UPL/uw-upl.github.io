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
    Coords: ["Anna", "Nico", "Ishan", "Nico", "Anna"],
  },
  {
    Time: "12 - 1 PM",
    Coords: ["Sam", "Jiamu", "Sam", "Jiamu", "Chris"],
  },
  {
    Time: "1 - 2 PM",
    Coords: ["Emily", "Rahul", "", "Rahul", "Chris"],
  },
  {
    Time: "2 - 3 PM",
    Coords: ["Emily", "", "", "", ""],
  },
  {
    Time: "3 - 4 PM",
    Coords: ["Michael", "", "Michael", "", ""],
  },
  {
    Time: "4 - 5 PM",
    Coords: ["Grace", "Ahmet", "Ishan", "Ahmet", ""],
  },
  {
    Time: "5 - 6 PM",
    Coords: ["Grace", "", "", "", ""],
  },
];

export default CoordHours;
