import React from "react";
import Title from "../../components/title/Title";
import { Divider, TextInput, Select, SelectItem } from "@tremor/react";

const Profile = () => {
  return (
    <div className="flex-1 px-5 py-8 h-[100vh] 2xl:px-12 2xl:py-12 overflow-y-auto relative">
      <Title text="Profile" />
      <div className="max-w-2xl">
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Name
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="first-name"
                placeholder="First name"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Email
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Type of Document
                <span className="text-red-500">*</span>
              </label>
              <Select className="mt-2" defaultValue="1">
                <SelectItem value="1">DUI</SelectItem>
                <SelectItem value="2">Passport</SelectItem>
              </Select>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Document Number
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="number"
                id="document-number"
                name="document-number"
                placeholder="Document Number"
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
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
