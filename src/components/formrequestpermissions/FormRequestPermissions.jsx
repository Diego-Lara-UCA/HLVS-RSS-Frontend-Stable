import React, { useState } from "react";
import {
  Button,
  Input,
  DatePicker,
  TimeInput,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ClockCircleLinearIcon } from "../clockcircleLinearicon/ClockCircleLinearIcon";
import axios from "axios";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";

const days = [
  { key: "1", label: "Monday" },
  { key: "2", label: "Tuesday" },
  { key: "3", label: "Wednesday" },
  { key: "4", label: "Thursday" },
  { key: "5", label: "Friday" },
  { key: "6", label: "Saturday" },
  { key: "7", label: "Sunday" },
];

const FormRequestPermissions = () => {
  let options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let currentDate = new Date()
    .toLocaleDateString("es-ES", options)
    .split("/")
    .reverse()
    .join("-");
  const [selectedDays, setSelectedDays] = useState([]);
  const [isMultipleDate, setIsMultipleDate] = useState(true);
  const [isMultipleHour, setIsMultipleHour] = useState(true);
  const [emailVisitant, setEmailVisitant] = useState("");
  const [firstDateRange, setFirstDateRange] = useState(parseDate(currentDate));
  const [secondDateRange, setSecondDateRange] = useState(parseDate(currentDate));
  const [singleDate, setSingleDate] = useState(parseDate(currentDate));
  const [initialHour, setInitialHour] = useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));
  const [finalHour, setFinalHour] = useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));
  const [singleHour, setSingleHour] = useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  

  const handleSelectionChange = (e) => {
    setSelectedDays(new Set(e.target.value.split(",")));
  };

  const formatDate = (date) => {
    return `${date.year}-${date.month.toString().padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`;
  };

  const formatTime = (time) => {
    return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}:${time.second.toString().padStart(2, "0")}`;
  };

  function postRequestPermissions() {
    const firstDateRangeFormatted = formatDate(firstDateRange);
    const secondDateRangeFormatted = formatDate(secondDateRange);
    const singleDateFormatted = formatDate(singleDate);
    const initialHourFormatted = formatTime(initialHour);
    const finalHourFormatted = formatTime(finalHour);
    const singleHourFormatted = formatTime(singleHour);
  
    console.log(emailVisitant);
    console.log(isMultipleDate ? firstDateRangeFormatted : singleDateFormatted);
    console.log(isMultipleDate ? secondDateRangeFormatted : singleDateFormatted);
    console.log(selectedDays);
    console.log(isMultipleHour ? initialHourFormatted : singleHourFormatted);
    console.log(isMultipleHour ? finalHourFormatted : singleHourFormatted);

  

  
    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/request-permissions`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: emailVisitant,
        days: selectedDays,
        firstDate: isMultipleDate ? firstDateRangeFormatted : singleDateFormatted,
        secondDate: isMultipleDate ? secondDateRangeFormatted : singleDateFormatted,
        daysOfWeek: Array.from(selectedDays),
        initialHour: isMultipleHour ? initialHourFormatted : singleHourFormatted,
        finalHour: isMultipleHour ? finalHourFormatted : singleHourFormatted,
      },
    }).then((response) => {
      console.log(response);
    });
  }
  
  return (
    <div>
      <form className="mt-5">
        <div className="flex flex-col max-w-3xl gap-4">
          <Input
            label="Email visitant"
            type="text"
            value={emailVisitant}
            onChange={(e) => setEmailVisitant(e.target.value)}
          />
          <div>
            <Button
              className={`bg-zinc-300 text-white mr-2 ${
                isMultipleDate ? "bg-zinc-500" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleDate(true)}
            >
              Multiple date
            </Button>
            <Button
              className={`bg-zinc-300 px-6 text-white ${
                !isMultipleDate ? "bg-zinc-500" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleDate(false)}
            >
              Single date
            </Button>
          </div>
          {isMultipleDate ? (
            <div className="flex flex-col">
              <div className="flex gap-2 mb-4">
                <DatePicker
                  label="Select a initial date"
                  value={firstDateRange}
                  onChange={setFirstDateRange}
                />
                <DatePicker
                  label="Select a final date"
                  value={secondDateRange}
                  onChange={setSecondDateRange}
                />
              </div>

              <div className="overflow-x-auto flex flex-row flex-nowrap gap-2 ">
                <Select
                  label="Select days of the week"
                  selectionMode="multiple"
                  selectedKeys={selectedDays}
                  onChange={handleSelectionChange}
                >
                  {days.map((day) => (
                    <SelectItem key={day.label}>{day.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          ) : (
            <div>
              <DatePicker
                label="Select a date"
                value={singleDate}
                onChange={setSingleDate}
              />
            </div>
          )}

          <div>
            <Button
              className={`bg-zinc-300 text-white mr-2 ${
                isMultipleHour ? "bg-zinc-500" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleHour(true)}
            >
              Multiple hours
            </Button>
            <Button
              className={`bg-zinc-300 px-6 text-white ${
                !isMultipleHour ? "bg-zinc-500" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleHour(false)}
            >
              Single hour
            </Button>
          </div>
          {isMultipleHour ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <TimeInput
                  label="Select the start time"
                  labelPlacement="inside"
                  hideTimeZone
                  hourCycle={24}
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={initialHour}
                  onChange={setInitialHour}
                />
                <TimeInput
                  label="Select the end time"
                  labelPlacement="inside"
                  hideTimeZone
                  hourCycle={24}
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={finalHour}
                  onChange={setFinalHour}
                />
              </div>
              <div className="mt-2 pl-2">
                <RadioGroup
                  className="text-xs"
                  label="Expiration time "
                  orientation="horizontal"
                >
                  <Radio className="mr-2" value="1">
                    <span className="text-sm"> By range</span>
                  </Radio>
                  <Radio value="2">
                    <span className="text-sm"> By entry</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          ) : (
            <div>
              <TimeInput
                label="Select a one hour time slot"
                labelPlacement="inside"
                hideTimeZone
                hourCycle={24}
                endContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={singleHour}
                onChange={setSingleHour}
              />
            </div>
          )}

          <div className="mt-8 py-4 flex justify-center lg:justify-end ">
            <Button
              onClick={postRequestPermissions}
              className=" bg-zinc-700 text-white"
              variant="shadow"
            >
              Request permission
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRequestPermissions;
