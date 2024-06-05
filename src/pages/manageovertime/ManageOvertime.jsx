import React from "react";
import Title from "../../components/title/Title";
import { Divider, TextInput, Select, SelectItem } from "@tremor/react";

const ManageOvertime = () => {
  return (
    <div className="container-tab">
      <Title title="Manage Overtime" description="" />
      <form action="#" method="post" className="mt-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="first-name"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Extra time for permissions
            </label>
            <TextInput
              type="number"
              id="extra-time-for-permissions"
              name="extra-time-for-permissions"
              placeholder="Type..."
              className="mt-2"
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Extra time for keys
            </label>
            <TextInput
              type="number"
              id="extra-time-for-keys"
              name="extra-time-for-keys"
              placeholder="Type..."
              className="mt-2"
              required
            />
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageOvertime;
