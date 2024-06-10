import React from "react";
import Title from "../../components/title/Title";
import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className="container-tab">
      <Title
        title="Profile"
        description="Set up your environment, don't share your personal information"
      />
      <form className="mt-8">
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          <Input
            className="col-span-2"
            type="text"
            label="Name"
            onClear={() => console.log("input cleared")}
          />
          <Input
            className="col-span-2"
            type="email"
            label="Email"
            onClear={() => console.log("input cleared")}
          />
          <Select label="Type of document">
            <SelectItem>DUI</SelectItem>
            <SelectItem>Passport</SelectItem>
          </Select>
          <Input
            type="text"
            label="Document number"
            onClear={() => console.log("input cleared")}
          />
        </div>
      <div className="mt-8">
          <Button
            color="secondary"
            variant="shadow"
          >
            Save changes
          </Button>
      </div>
      </form>
    </div>
  );
};

export default Profile;
