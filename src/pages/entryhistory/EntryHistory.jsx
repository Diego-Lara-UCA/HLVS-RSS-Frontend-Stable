import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  DatePicker,
  Divider,
  Card,
  CardBody,
} from "@nextui-org/react";
import { SearchIcon } from "../../components/searchicon/SearchIcon";
import { ChevronDownIcon } from "../../components/chevrondownicon/ChevronDownIcon";
import { capitalize } from "../../components/capitalize/utils";
import { columns, users } from "./data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";

ChartJS.register(ArcElement, Tooltip, Legend);

const test = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const INITIAL_VISIBLE_COLUMNS = [
  "user",
  "house",
  "entryPlace",
  "date",
  "hour",
  "comment",
];

const EntryHistory = () => {
  const [isDateSelected, setIsDateSelected] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const [dateRange, setDateRange] = React.useState([null, null]);

  const onDateChange = (newDateRange) => {
    setDateRange(newDateRange);
    setIsDateSelected(newDateRange[0] !== null && newDateRange[1] !== null);
    setPage(1); // Reset to first page on date change
  };

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.house.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.entryPlace.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.user.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (isDateSelected) {
      const [startDate, endDate] = dateRange;
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);

      filteredUsers = filteredUsers.filter((user) => {
        const userDate = new Date(user.date).setHours(0, 0, 0, 0);
        return userDate >= start && userDate <= end;
      });
    }

    return filteredUsers;
  }, [users, filterValue, dateRange, isDateSelected]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "date":
      case "house":
      case "entry place":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex flex-col flex-1 flex-wrap 2xl:flex-nowrap gap-4">
            <div className="flex gap-2">
              <DatePicker value={dateRange[0]} onChange={(date) => onDateChange([date, dateRange[1]])} />
              <DatePicker value={dateRange[1]} onChange={(date) => onDateChange([dateRange[0], date])} />
            </div>
            <Input
              isClearable
              className="w-full"
              placeholder="Search by house, entry place, or user"
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} entry history
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    dateRange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-indigo-500 text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-indigo-500 text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages]);

  // ############################################################################################
  // GET request to get the entry history

  const [entryHistory, setEntryHistory] = React.useState([]);

  useEffect(() => {
    getEntryHistory();
  }, []);



  function getEntryHistory() {
    axios({
      method: "GET",
      url: `https://api.securityhlvs.com/api/log-of-entries`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      setEntryHistory(response.data);
    });
  }

  return (
    <div className="container-tab">
      <Title
        title="Entry History"
        description="Track entries, view charts, and explore more!"
      />
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            isDateSelected ? "No history found" : "Please select a date range"
          }
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Divider className="my-10" />

      <Title
        title="Graphics"
        description="See the entry history in a visual way!"
      />

      <div className="grid grid-cols-3">
        <Card className="max-w-xs px-5 py-8">
          <label
            className="text-sm font-bold text-center mb-2"
            htmlFor="doughnutChart"
          >
            Type of entry
          </label>
          <Doughnut id="doughnutChart" updateMode="resize" data={test} />
        </Card>
      </div>
    </div>
  );
};

export default EntryHistory;
