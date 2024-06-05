import React from "react";
import Title from "../../components/title/Title";
import { Card, DatePicker, DateRangePicker } from "@tremor/react";
import { RiArrowRightLine, RiSearch2Line } from "@remixicon/react";
import { Button } from "@tremor/react";
import { DonutChart, Legend, LineChart } from "@tremor/react";

const sales = [
  {
    name: "Vehicular Access",
    sales: 980,
  },
  {
    name: "Pedestrian Access",
    sales: 456,
  },
  {
    name: "Anonymous Access",
    sales: 390,
  },
];

const chartdata = [
  {
    date: "Jan 22",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 22",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 22",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 22",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 22",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 22",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 22",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 22",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 22",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 22",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 22",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 22",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const EntryHistory = () => {
  return (
    <div className="container-tab">
      <Title title="Entry History" description="" />
      <h2 className="mb-4">Filter by date</h2>
      <div className="mb-10">
        <div className=" flex gap-5 flex-col mb-4 md:flex-row 2xl:flex-row">
          <DateRangePicker className="max-w-md" />
          <Button variant="secondary" icon={RiSearch2Line}>
            Search
          </Button>
        </div>
        <Card className="h-64" />
      </div>
      <Title title="Graphics" description="" />
      <div className="flex w-full mb-4 gap-5">
        <Card
          className="max-w-xs w-full"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Families
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            32
          </p>
        </Card>
        <Card
          className="max-w-xs w-full"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Users
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            105
          </p>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="flex justify-center items-center flex-col">
          <DonutChart
            data={sales}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
            className="w-40 mb-5"
          />
          <Legend
            categories={[
              "Vehicle Access",
              "Pedestrian Access",
              "Anonymous Access",
            ]}
            colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
            className="max-w-xs"
          />
        </Card>

        <Card>
          <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={["SolarPanels", "Inverters"]}
            colors={["indigo", "rose"]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        </Card>
      </div>
    </div>
  );
};

export default EntryHistory;
