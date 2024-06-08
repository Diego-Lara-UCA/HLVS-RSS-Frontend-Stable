import { Button } from "@nextui-org/react";
import React, { useState } from "react";


const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DateHourInputs = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        // Si el día ya está seleccionado, lo eliminamos de la lista
        return prevDays.filter((d) => d !== day);
      } else {
        // Si el día no está seleccionado, lo agregamos a la lista
        return [...prevDays, day];
      }
    });
  };

  return (
    <div>
      <div className="mt-5 flex gap-3 overflow-auto">
        {daysOfWeek.map((day, index) => (
          <Button
            className={`bg-gray-200 border-gray-200 text-gray-500 hover:bg-gray-300 hover:border-gray-300 ${
              selectedDays.includes(day)
                ? "bg-gray-400 hover:bg-gray-400 text-white"
                : ""
            }`}
            key={index}
            onClick={() => toggleDay(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateHourInputs;
