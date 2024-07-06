import React from "react";
const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
  },
];

export { columns, users };