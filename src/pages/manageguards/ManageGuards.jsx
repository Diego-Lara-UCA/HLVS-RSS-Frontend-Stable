import React from "react";
import Title from "../../components/title/Title";
import { Card, TextInput, Button } from "@tremor/react";

import { RiSearch2Line } from "@remixicon/react";

const ManageGuards = () => {
  return (
    <div className="container-tab">
      <Title title="Manage Guards" />
      <div className="mb-5">
        <div className=" flex gap-5 flex-col mb-4 md:flex-row 2xl:flex-row">
          <TextInput className="max-w-md" />
          <Button className="px-10" variant="secondary">
            Add
          </Button>
        </div>
      </div>
      <Card className="flex flex-col gap-2 ">
        <div className="flex justify-end w-full">
          <Button
            className="w-24 text-red-400 border-red-400 hover:bg-red-50 hover:text-red-500"
            variant="secondary"
          >
            Delete
          </Button>
        </div>
        <div className="flex justify-end w-full">
          <Button
            className="w-24 text-red-400 border-red-400 hover:bg-red-50 hover:text-red-500"
            variant="secondary"
          >
            Delete
          </Button>
        </div>
        <div className="flex justify-end w-full">
          <Button
            className="w-24 text-red-400 border-red-400 hover:bg-red-50 hover:text-red-500"
            variant="secondary"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManageGuards;
