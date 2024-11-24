import React, { useState } from "react";
import Title from "../../components/Title/Title";
import { Button, TimeInput } from "@nextui-org/react";
import { ClockCircleLinearIcon } from "../../assets/icons/ClockCircleLinearIcon";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ManageOvertime = () => {
  const [overtime, setOvertime] = useState(
    parseAbsoluteToLocal("2024-04-08T18:45:00Z")
  );

  const formatTime = (time) => {
    return `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}:${time.second.toString().padStart(2, "0")}`;
  };

  function postManageOvertime() {
    if (!overtime) {
      toast("Please fill all the fields", { type: "error" });
      return;
    }

    axios({
      method: "put",
      url: `https://api.securityhlvs.com/api/grace-time/update`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        overtime: formatTime(overtime),
      },
    })
      .then(() => {
        toast("Overtime updated successfully", { type: "success" });
      })
      .catch(() => {
        toast("Error updating overtime", { type: "error" });
      });
  }

  return (
    <div className="container-tab">
      <Title
        title="Manage Overtime"
        description="Change these parameters only if necessary"
      />
      <div className="mt-8 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <TimeInput
            label="Overtime"
            labelPlacement="inside"
            hideTimeZone
            hourCycle={24}
            endContent={
              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={overtime}
            onChange={setOvertime}
          />
        </div>

        <div className="mt-10">
          <Button
            onPress={postManageOvertime}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Save changes
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageOvertime;
