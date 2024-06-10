import React from "react";
import Title from "../../components/title/Title";
import { Button, Divider, Input } from "@nextui-org/react";

const ManageOvertime = () => {
  return (
    <div className="container-tab">
      <Title
        title="Manage Overtime"
        description="Change these parameters only if necessary"
      />
      <form className="mt-8 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <Input
            className="col-span-2"
            type="text"
            label="Extra time permits"
            onClear={() => console.log("input cleared")}
          />
          <Input
            className="col-span-2"
            type="text"
            label="Extra key time"
            onClear={() => console.log("input cleared")}
          />
        </div>

        <div className="mt-10">
          <Button color="secondary" variant="shadow">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageOvertime;
