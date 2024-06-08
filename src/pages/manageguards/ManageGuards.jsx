import React from "react";
import Title from "../../components/title/Title";
import { Input, Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { DeleteIcon } from "../../components/deleteicon/DeleteIcon";
import { columns, users } from "./data";

const ManageGuards = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete guard">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="container-tab">
      <Title
        title="Manage Guards"
        description="Security is important, trust is important"
      />
      <form action="">
        <div className="flex items-center max-w-6xl gap-3">
          <Input label="Email" type="text" />
          <Button
            className="py-7 px-8 bg-indigo-200 text-indigo-600"
            variant="flat"
            type="button"
          >
            Add guard
          </Button>
        </div>
        <Table className="mt-5"  selectionMode="multiple"  aria-label="Example table with custom cells ">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </form>
    </div>
  );
};

export default ManageGuards;
