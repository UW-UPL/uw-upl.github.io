import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faDoorClosed } from "@fortawesome/free-solid-svg-icons";

const DoorStatus = () => {
  const [isOpen, setIsOpen] = useState(null);

  const fetchDoorStatus = async () => {
    try {
      const response = await fetch("https://doors.amoses.dev/door-status");
      const data = await response.json();
      const { door1, door2 } = data.status;

      // determine if the UPL is open
      if (door1 === "open" && door2 === "open") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error fetching door status:", error);
      setIsOpen(false); // default to closed
    }
  };

  useEffect(() => {
    fetchDoorStatus();
    const interval = setInterval(fetchDoorStatus, 500); // fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <a
      className={`md:text-md text-sm inline-flex items-center w-fit text-black font-sans font-semibold py-2 px-3 rounded-md focus:outline outline-offset outline-3 outline-sky-300`}
    >
      <div className="mr-2 flex-shrink-0">
        <FontAwesomeIcon icon={isOpen ? faDoorOpen : faDoorClosed} />
      </div>
      <p className="flex-nowrap">
        The doors are{" "}
        <span
          className={
            isOpen === null
              ? "text-gray-500 font-bold"
              : isOpen
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
          }
        >
          {isOpen === null ? "loading..." : isOpen ? "open" : "closed"}
        </span>
        !
      </p>
    </a>
  );
};

export default DoorStatus;