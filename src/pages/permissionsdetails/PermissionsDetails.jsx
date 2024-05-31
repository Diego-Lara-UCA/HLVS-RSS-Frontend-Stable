import React from "react";
import Title from "../../components/title/Title";
import {headers, data} from "./dataPermissionsDetails";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      type="button"
      className="group px-2.5 py-2 text-tremor-default disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const PermissionsDetails = () => {
  const pageSize = 8;

  // Renderizar encabezados de la tabla
  const tableColumns = useMemo(() => headers, []);

  // Renderizar datos de la tabla
  const tableData = useMemo(
    () => [...data],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [
        {
          id: "Last e",
          desc: false,
        },
      ],
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="container-tab">
      <Title title="Current Permissions" description="" />
      <Card className="mb-20">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-tremor-border dark:border-dark-tremor-border"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    scope="col"
                    className={classNames(header.column.columnDef.meta.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={classNames(cell.column.columnDef.meta.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-10 flex items-center justify-between">
          <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
            Page{" "}
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{`${
              table.getState().pagination.pageIndex + 1
            }`}</span>{" "}
            of
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {" "}
              {`${table.getPageCount()}`}
            </span>
          </p>
          <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring dark:shadow-dark-tremor-input dark:ring-dark-tremor-ring">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <RiArrowLeftSLine
                className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                aria-hidden={true}
              />
            </Button>
            <span
              className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
              aria-hidden={true}
            />
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next</span>
              <RiArrowRightSLine
                className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                aria-hidden={true}
              />
            </Button>
          </div>
        </div>
      </Card>

      {/* Expired Permissions */}
      <Title title="Expired Permissions" description="" />
      <Card className="mb-20">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-tremor-border dark:border-dark-tremor-border"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    scope="col"
                    className={classNames(header.column.columnDef.meta.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={classNames(cell.column.columnDef.meta.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-10 flex items-center justify-between">
          <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
            Page{" "}
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{`${
              table.getState().pagination.pageIndex + 1
            }`}</span>{" "}
            of
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {" "}
              {`${table.getPageCount()}`}
            </span>
          </p>
          <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring dark:shadow-dark-tremor-input dark:ring-dark-tremor-ring">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <RiArrowLeftSLine
                className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                aria-hidden={true}
              />
            </Button>
            <span
              className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
              aria-hidden={true}
            />
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next</span>
              <RiArrowRightSLine
                className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                aria-hidden={true}
              />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PermissionsDetails;
