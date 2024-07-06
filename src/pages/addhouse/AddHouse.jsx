import React, { useState } from "react";
import Title from "../../components/title/Title";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

const AddHouse = () => {
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [residents, setResidents] = useState("");
  const [residentInCharge, setResidentInCharge] = useState("");

  function postAddHouse() {
    console.log(houseNumber);
    console.log(address);
    console.log(residents);
    console.log(residentInCharge);

    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/log-of-entries`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        houseNumber: houseNumber,
        address: address,
        residents: residents,
        residentInCharge: residentInCharge,
      },
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
          label="Resident in charge"
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
    </div>
  );
};

export default AddHouse;
