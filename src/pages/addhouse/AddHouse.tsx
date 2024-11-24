import React, { useState } from "react";
import Title from "../../components/Title/Title";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddHouse = () => {
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [residents, setResidents] = useState("");
  const [residentInCharge, setResidentInCharge] = useState("");

  function emptyFields() {
    setHouseNumber("");
    setAddress("");
    setResidents("");
    setResidentInCharge("");
  }

  function postAddHouse() {
  
    const residentsInt = parseInt(residents, 10);

    if (
      houseNumber === "" ||
      address === "" ||
      residents === "" ||
      residentInCharge === ""
    ) {
      toast("Please fill all the fields", { type: "error" });
      return;
    }

    axios({
      method: "post",
      url: "https://api.securityhlvs.com/api/residential/house/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: houseNumber,
        direccion: address,
        cantidad_residentes: residentsInt,
        users: residentInCharge,
      },
    })
      .then(() => {
        toast("House added successfully", { type: "success" });
        emptyFields();
      })
      .catch((error) => {
        toast("Error adding house", { type: "error" });
      });
  }

  return (
    <div className="container-tab">
      <Title
        title="Add House"
        description="Add a new family to the residential"
      />
      <div className="flex flex-col gap-4 max-w-3xl">
        <Input
          label="House number (ID)"
          type="text"
          value={houseNumber}
          onValueChange={setHouseNumber}
        />
        <Input
          label="Address"
          type="text"
          value={address}
          onValueChange={setAddress}
        />
        <Input
          label="Number of residents"
          type="text"
          value={residents}
          onValueChange={setResidents}
        />
        <Input
          label="Resident in charge (email)"
          type="text"
          value={residentInCharge}
          onValueChange={setResidentInCharge}
        />
        <p className="text-small text-gray-400">
          Remember not to share personal information about yourself or anyone
          else
        </p>
        <div className="mt-5">
          <Button
            onPress={postAddHouse}
            className="bg-zinc-700 text-white"
            variant="shadow"
            type="button"
          >
            Add house
          </Button>
        </div>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default AddHouse;
