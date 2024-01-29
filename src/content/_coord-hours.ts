interface CoordHour {
  Time: string;

  // in order: Monday, Tuesday, Wednesday, Thursday, Friday
  Coords: string[];
}

let CoordHours: CoordHour[] = [
  {
    Time: "10 - 11 AM",
    Coords: ["Michael", "", "", "", "Emily"],
  },
  {
    Time: "11 AM - 12 PM",
    Coords: ["Chris", "Rudy", "", "Rudy", "Emily"],
  },
  {
    Time: "12 - 1 PM",
    Coords: ["Alan", "", "Pranav", "Alan", "Pranav"],
  },
  {
    Time: "1 - 2 PM",
    Coords: ["Michael", "Ben L", "", "Ben L", "Sam"],
  },
  {
    Time: "2 - 3 PM",
    Coords: ["David", "Mihir", "David", "", "Sam"],
  },
  {
    Time: "3 - 4 PM",
    Coords: ["Ben", "Mihir", "Ben", "", ""],
  },
  {
    Time: "4 - 5 PM",
    Coords: ["Grace", "", "Chris", "", ""],
  },
  {
    Time: "5 - 6 PM",
    Coords: ["Grace", "", "", "", ""],
  },
];

export default CoordHours;
