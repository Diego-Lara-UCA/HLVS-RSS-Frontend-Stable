const columns = [
  { name: "HOUR", uid: "hour", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "HOUSE", uid: "house", sortable: true },
  { name: "ENTRY PLACE", uid: "entryPlace", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
];

const statusOptions = [
  { name: "Current", uid: "current" },
  { name: "Expired", uid: "expired" },
];

const users = [
  {
    id: 1,
    hour: "10:00",
    date: "2022-01-01",
    house: "House A",
    entryPlace: "Pedestrian",
    status: "current",
  },
  {
    id: 2,
    hour: "11:00",
    date: "2022-01-02",
    house: "House B",
    entryPlace: "Vehicular",
    status: "current",
  },
  {
    id: 3,
    hour: "12:00",
    date: "2022-01-03",
    house: "House C",
    entryPlace: "Vehicular",
    status: "expired",
  },
];

export { columns, users, statusOptions };
