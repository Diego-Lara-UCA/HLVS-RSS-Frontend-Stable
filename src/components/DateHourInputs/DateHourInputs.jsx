import React, { useState } from "react";
import { DatePicker, Button } from "@tremor/react";

const DateHourInputs = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [showMultipleDates, setShowMultipleDates] = useState(null);
  const [showMultipleHours, setShowMultipleHours] = useState(null);

  return (
    <div>
      <div className="mt-8 flex gap-4">
        <Button variant="secondary" onClick={() => setShowMultipleDates(true)}>
          Multiple dates
        </Button>
        <Button
          variant="secondary"
          className="px-8"
          onClick={() => setShowMultipleDates(false)}
        >
          Only date
        </Button>
      </div>
      {showMultipleDates === true ? (
        <div>
          <div className="flex justify-center items-center mt-5 ">
            <DatePicker />
            <p className="px-5 text-center font-mono text-sm text-slate-500">
              to
            </p>
            <DatePicker />
          </div>
          <div className="mt-5 flex gap-3 overflow-auto">
            {daysOfWeek.map((day, index) => (
              <Button
                className="bg-gray-200 border-gray-200 text-gray-500 hover:bg-gray-300 hover:border-gray-300"
                key={index}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      ) : showMultipleDates === false ? (
        <div className="flex justify-center items-center max-w-xs mt-5">
          <DatePicker />
        </div>
      ) : null}

      <div className="mt-10 flex gap-4">
        <Button variant="secondary" onClick={() => setShowMultipleHours(true)}>
          Multiple hours
        </Button>
        <Button
          variant="secondary"
          className="px-8"
          onClick={() => setShowMultipleHours(false)}
        >
          Only hour
        </Button>
      </div>
      {showMultipleHours === true ? (
        <div className="flex justify-center items-center mt-5 ">
          <DatePicker />
          <p className="px-5 text-center font-mono text-sm text-slate-500">
            to
          </p>
          <DatePicker />
        </div>
      ) : showMultipleHours === false ? (
        <div className="flex justify-center items-center max-w-xs mt-5">
          <DatePicker />
        </div>
      ) : null}
    </div>
  );
};

export default DateHourInputs;
