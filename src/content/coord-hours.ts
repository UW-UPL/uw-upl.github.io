interface CoordHour {
  Time: string;

  // in order: Monday, Tuesday, Wednesday, Thursday, Friday
  Coords: string[];
}

let CoordHours: CoordHour[] = [
  {
    Time: "10 - 11 AM",
    Coords: ["Ben L", "", "Ben L", "", ""],
  },
  {
    Time: "11 AM - 12 PM",
    Coords: ["Michael N", "David", "Michael N", "David", ""],
  },
  {
    Time: "12 - 1 PM",
    Coords: ["Pranav", "Pranav", "Ben W", "", ""],
  },
  {
    Time: "1 - 2 PM",
    Coords: ["", "Sam", "", "Sam", "Mihir"],
  },
  {
    Time: "2 - 3 PM",
    Coords: ["", "", "Ben W", "Rudy", "Mihir"],
  },
  {
    Time: "3 - 4 PM",
    Coords: ["Grace S", "Berkey", "Berkey", "Rudy", "Emily"],
  },
  {
    Time: "4 - 5 PM",
    Coords: ["", "", "Grace S", "", "Emily"],
  },
];

export default CoordHours;
