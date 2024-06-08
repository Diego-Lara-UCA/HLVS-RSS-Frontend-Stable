import React from "react";
import Title from "../../components/title/Title";
import { Input } from "@nextui-org/react";

const RequestPermissions = () => {
  return (
    <div className="container-tab">
      <Title
        title="Request Permission"
        description="Request the necessary permits to give access to your home"
      />
      <Input label="Email visitant" />
    </div>
  );
};

export default RequestPermissions;