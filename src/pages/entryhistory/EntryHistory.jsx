import React from "react";
import Title from "../../components/title/Title";
import { DatePicker, DateRangePicker } from "@tremor/react";
import { RiArrowRightLine, RiSearch2Line } from "@remixicon/react";
import { Button } from "@tremor/react";

const EntryHistory = () => {
  return (
    <div className="container-tab">
      <Title title="Entry History" description="" />
      <h2 className="mb-4">Filter by date</h2>
      <div className="flex gap-5 flex-col md:flex-row 2xl:flex-row">
        <DateRangePicker className="max-w-md" />
        <Button variant="secondary" icon={RiSearch2Line}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default EntryHistory;
