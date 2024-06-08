import React, { useState } from "react";
import Title from "../../components/title/Title";
import ActionButton from "../../components/actionbutton/ActionButton";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const ManageHouses = () => {
  const [selected, setSelected] = useState("login");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfResidents, setNumberOfResidents] = useState("");
  const [residentInCharge, setResidentInCharge] = useState("");

  const handleAddHouse = async (event) => {
    event.preventDefault();
    const response = await fetch("http://your-backend-url.com/add-house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseNumber,
        address,
        numberOfResidents,
        residentInCharge,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleEditHouse = async (event) => {
    event.preventDefault();
    const response = await fetch("http://your-backend-url.com/edit-house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseNumber,
        address,
        numberOfResidents,
        residentInCharge,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleGetHouse = async () => {
    const response = await fetch("http://your-backend-url.com/get-house", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="container-tab pb-20">
      <Title
        title="Manage Houses"
        description="Manage your house list: add new entries, update existing ones, or remove as needed."
      />

      <Card className="m-auto max-w-3xl shadow-small">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="add-house" title="Add house">
              <form className="flex flex-col gap-4" onSubmit={handleAddHouse}>
                <Input
                  label="House number (ID)"
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
                <Input
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  label="Number of residents"
                  type="text"
                  value={numberOfResidents}
                  onChange={(e) => setNumberOfResidents(e.target.value)}
                />
                <Input
                  label="Resident in charge"
                  type="text"
                  value={residentInCharge}
                  onChange={(e) => setResidentInCharge(e.target.value)}
                />
                <p className="text-center text-small text-gray-400">
                  Remember not to share personal information about yourself or
                  anyone else
                </p>
                <div className="flex mt-5 gap-2 justify-center">
                  <Button
                    fullWidth
                    className="bg-indigo-500 text-white"
                    variant="flat"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="edit-house" title="Edit house">
              <form className="flex flex-col gap-4" onSubmit={handleEditHouse}>
                <div className="flex items-center gap-3">
                  <Input
                    label="House number (ID)"
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                  <Button
                    className="py-7 px-8 bg-indigo-200 text-indigo-600"
                    variant="flat"
                    type="submit"
                  >
                    Search
                  </Button>
                </div>
                <Input
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  label="Numbers of residents"
                  type="text"
                  value={numberOfResidents}
                  onChange={(e) => setNumberOfResidents(e.target.value)}
                />
                <Input
                  label="Resident in charge (email)"
                  type="text"
                  value={residentInCharge}
                  onChange={(e) => setResidentInCharge(e.target.value)}
                />
                <Divider className="my-4" />
                <h2 className="text-gray-600 font-semibold">
                  Resident Details
                </h2>
                <div className="flex items-center gap-3">
                  <Input
                    label="Resident"
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                  <Button
                    className="py-7 px-10 bg-green-200 text-green-700"
                    variant="flat"
                    type="submit"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    label="Resident"
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                  <Button
                    className="py-7 px-8 bg-red-200 text-red-700"
                    variant="flat"
                    type="submit"
                  >
                    Delete
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    label="Resident"
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                  <Button
                    className="py-7 px-8 bg-red-200 text-red-700"
                    variant="flat"
                    type="submit"
                  >
                    Delete
                  </Button>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    className="bg-indigo-500 text-white"
                    variant="flat"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageHouses;
