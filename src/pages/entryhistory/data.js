const columns = [
  { name: "USER", uid: "user", sortable: true },
  { name: "HOUSE", uid: "house", sortable: true },
  { name: "ENTRY PLACE", uid: "entryPlace", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "HOUR", uid: "hour", sortable: true },
  { name: "COMMENT", uid: "comment", sortable: true },
];

const users = [
  {
    id: 1,
    user: "User A",
    house: "House A",
    entryPlace: "Vehicular",
    date: "2022-01-01",
    hour: "10:00",
    comment: "This is a brief description for User A",
  },
  {
    id: 2,
    user: "User B",
    house: "House B",
    entryPlace: "Pedestrian",
    date: "2022-01-02",
    hour: "11:00",
    comment: "This is a brief description for User B",
  },
  {
    id: 3,
    user: "User C",
    house: "House C",
    entryPlace: "Vehicular",
    date: "2022-01-03",
    hour: "12:00",
    comment: "This is a brief description for User C",
  },
];

export { columns, users };
