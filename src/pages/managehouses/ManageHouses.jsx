import React from "react";
import Title from "../../components/title/Title";
import ActionButton from "../../components/actionbutton/ActionButton";
import { Button, Dialog, DialogPanel, TextInput, Divider } from "@tremor/react";
import { RiSearch2Line } from "@remixicon/react";

const ManageHouses = () => {
  const [isOpenAdd, setIsOpenAdd] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  return (
    <div className="container-tab">
      <Title title="Manage Houses" description="" />

      <div className="grid grid-cols-1 gap-4">
        <ActionButton
          title="Add new house"
          color="bg-indigo-200"
          hover="hover:bg-indigo-300"
          onClick={() => setIsOpenAdd(true)}
        />
        <ActionButton
          title="Edit house"
          color="bg-indigo-400"
          hover="hover:bg-indigo-500"
          onClick={() => setIsOpenEdit(true)}
        />
      </div>

      {/* Modal add house */}
      <Dialog
        open={isOpenAdd}
        onClose={(val) => setIsOpenAdd(val)}
        static={true}
      >
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-5">
            Add House
          </h3>
          <form>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                House Number (ID)
              </label>
              <TextInput
                type="number"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Address
              </label>
              <TextInput
                type="text"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Number of Residents
              </label>
              <TextInput
                type="number"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Resident in charge (email)
              </label>
              <TextInput
                type="number"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="mt-2 ">Save</Button>
              <Button
                className="mt-2  bg-gray-400 border-gray-400 hover:bg-gray-500 hover:border-gray-500"
                onClick={() => setIsOpenAdd(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>

      {/* Modal edit house */}
      <Dialog
        open={isOpenEdit}
        onClose={(val) => setIsOpenEdit(val)}
        static={true}
      >
        <DialogPanel className="2xl:max-w-2xl overflow-y-auto max-h-[600px] px-8 py-12">
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-5">
            Edit House
          </h3>
          <form>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                House Number (ID)
              </label>
              <div className="flex justify-center items-center mt-2 gap-2">
                <TextInput type="number" placeholder="Type..." required />
                <Button variant="secondary" icon={RiSearch2Line}>
                  Search
                </Button>
              </div>
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Address
              </label>
              <TextInput
                type="text"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Number of Residents
              </label>
              <TextInput
                type="number"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Resident in charge (email)
              </label>
              <TextInput
                type="number"
                placeholder="Type..."
                className="mt-2"
                required
              />
            </div>
            <Divider />
            <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-5">
              Resident Details
            </h3>
            <div className="col-span-full sm:col-span-3 mb-5">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Resident (email)
              </label>
              <div className="flex justify-center items-center mt-2 gap-2">
                <TextInput type="number" placeholder="Type..." required />
                <Button className="w-24" variant="secondary">Add</Button>
              </div>
              <div className="flex justify-center items-center mt-2 gap-2">
                <TextInput type="number" placeholder="Type..." required />
                <Button className="w-24 text-red-400 border-red-400 hover:bg-red-50 hover:text-red-500" variant="secondary">Delete</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="mt-2 ">Save</Button>
              <Button
                className="mt-2  bg-gray-400 border-gray-400 hover:bg-gray-500 hover:border-gray-500"
                onClick={() => setIsOpenEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default ManageHouses;
