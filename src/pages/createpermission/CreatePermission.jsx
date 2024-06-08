import React from "react";
import Title from "../../components/title/Title";
import DateHourInputs from "../../components/DateHourInputs/DateHourInputs";

const CreatePermission = () => {
  return (
    <div className="container-tab">
      <Title
        title="Create Permission"
        description="Be careful who you let into your home"
      />
      <div>
        <DateHourInputs />
        <button
          type="button"
          class="mt-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create permission
        </button>
      </div>
    </div>
  );
};

export default CreatePermission;
