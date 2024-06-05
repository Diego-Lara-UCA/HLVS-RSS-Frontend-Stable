import React from "react";
import Title from "../../components/title/Title";
import { TextInput, Button } from "@tremor/react";
import DateHourInputs from "../../components/DateHourInputs/DateHourInputs";

const CreatePermission = () => {
  return (
    <div className="container-tab">
      <Title
        title="Create Permission"
        description="Be careful who you let into your home"
      />
      <form>
        <label
          htmlFor="first-name"
          className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          Email visitant
        </label>
        <TextInput
          autoComplete="email"
          type="email"
          placeholder="Type..."
          className="mt-2 py-1"
          required
        />

        <DateHourInputs />
        <Button className="mt-16">Create permission</Button>
      </form>
    </div>
  );
};

export default CreatePermission;
