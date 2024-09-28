import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faDoorClosed } from "@fortawesome/free-solid-svg-icons";

const DoorStatus = () => {
  const [isOpen, setIsOpen] = useState(null);

  const fetchDoorStatus = async () => {
    try {
      const response = await fetch("https://doors.amoses.dev/door-status");
      const data = await response.json();

      // determine if the UPL is open
      const backDoor = data.find((door) => door.door === "back");
      const frontDoor = data.find((door) => door.door === "front");

      if (backDoor?.status === "on" && frontDoor?.status === "on") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error fetching door status:", error);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    fetchDoorStatus();
    const interval = setInterval(fetchDoorStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:text-md text-sm inline-flex flex-col items-center w-fit text-black font-sans font-semibold py-2 px-3 rounded-md focus:outline outline-offset outline-3 outline-sky-300 gap-1">
      <div className="inline-flex items-center">
        <div className="mr-2 flex-shrink-0">
          <FontAwesomeIcon icon={isOpen ? faDoorOpen : faDoorClosed} />
        </div>
        <p className="flex-nowrap m-0">
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
      </div>
      {!isOpen && isOpen !== null && (
        <a href="/hours" className="text-blue-800 underline m-0">
          Check our hours here.
        </a>
      )}
    </div>
  );
};

export default DoorStatus;
