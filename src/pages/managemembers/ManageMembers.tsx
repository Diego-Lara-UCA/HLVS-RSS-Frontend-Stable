import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { Input, Button } from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Divider,
  Pagination,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { columns } from "./data";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import { capitalize } from "../../components/capitalize/utils";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { add } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

const INITIAL_VISIBLE_COLUMNS = ["nombre", "correo_google", "actions"];

const ManageMembers = () => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const [users, setUsers] = useState([]);
  const [houseID, setHouseID] = useState("");
  const [address, setAddress] = useState("");
  const [residents, setResidents] = useState("");
  const [emailResident, setEmailResident] = useState("");
  const [addResident, setAddResident] = useState("");

  useEffect(() => {
    getMemberDetails();
  }, []);

  const token = localStorage.getItem("token");
  let emailSupervisor = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    emailSupervisor = decodedToken.email;
  }

  function emptyFields() {
    setAddResident("");
  }

  function getMemberDetails() {
    axios({
      method: "GET",
      url: `https://api.securityhlvs.com/api/residential/house/user-house/${emailSupervisor}`,
    })
      .then((response) => {
        console.log(response);
        const userData = response.data.data.users;
        setUsers(userData);
        if (userData.length > 0) {
          const user = userData[0];
          setHouseID(response.data.data.house_number);
          setAddress(response.data.data.direccion);
          setResidents(response.data.data.cantidad_residentes);
          setEmailResident(user.correo_google);
        }
      })
      .catch((error) => {
        toast("Error getting member details", { type: "error" });
      });
  }

  function postAddResident() {
    if (addResident === "") {
      toast("Please fill all the fields", { type: "error" });
      return;
    }

    axios({
      method: "POST",
      url: "https://api.securityhlvs.com/api/residential/house/register-residents",
      data: {
        house_id: houseID,
        email: addResident,
      },
    })
      .then((response) => {
        toast("Resident added successfully", { type: "success" });
        emptyFields();
        getMemberDetails();
      })
      .catch((error) => {
        toast("Error adding resident", { type: "error" });
      });
  }

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.correo_google.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or email..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} members
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="container-tab">
      <Title
        title="Manage Members"
        description="Stay aware of those who are next to you"
      />

      <div>
        <div className="max-w-3xl flex flex-col gap-4">
          <Input
            label="House number (ID)"
            type="text"
            readOnly
            value={houseID}
          />
          <Input label="Address" type="text" readOnly value={address} />
          <Input
            label="Numbers of residents"
            type="text"
            readOnly
            value={residents}
          />
          <Input
            label="Resident in charge (email)"
            type="text"
            readOnly
            value={emailResident}
          />
          <h2 className="text-gray-600 font-semibold mt-5">Resident Details</h2>
          <div className="flex items-center max-w-6xl gap-3">
            <Input
              label="Email"
              type="text"
              value={addResident}
              onChange={(e) => setAddResident(e.target.value)}
            />
            <Button
              className="py-7 px-8 bg-zinc-700 text-white"
              variant="flat"
              type="button"
              onPress={postAddResident}
            >
              Add member
            </Button>
          </div>
        </div>
        <Divider className="my-10" />
        <Table
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          className="mt-5"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          topContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          aria-label="Example table with custom cells "
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
          <TableBody emptyContent={"No data found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default ManageMembers;
