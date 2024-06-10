import React from "react";
import Title from "../../components/title/Title";
import { Input, Button } from "@nextui-org/react";

const AddHouse = () => {
  return (
    <div className="container-tab">
      <Title
        title="Add House"
        description="Add a new family to the residential"
      />
      <form className="flex flex-col gap-4 max-w-3xl">
        <Input label="House number (ID)" type="text" />
        <Input label="Address" type="text" />
        <Input label="Number of residents" type="text" />
        <Input label="Resident in charge" type="text" />
        <p className="text-small text-gray-400">
          Remember not to share personal information about yourself or anyone
          else
        </p>
        <div className="mt-5">
          <Button color="secondary" variant="shadow" type="button">
            Add house
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddHouse;
