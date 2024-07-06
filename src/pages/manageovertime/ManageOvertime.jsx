import React, { useState } from "react";
import Title from "../../components/title/Title";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";

const ManageOvertime = () => {
  const [extraTimePermits, setExtraTimePermits] = useState("");
  const [extraKeyTime, setExtraKeyTime] = useState("");

  function postManageOvertime() {

    console.log(extraTimePermits);
    console.log(extraKeyTime);
  
    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/manage-overtime`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        extraTimePermits: "extraTimePermits",
        extraKeyTime: "extraKeyTime",
      },
    });
  }

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
            onValue={extraTimePermits}
            onValueChange={setExtraTimePermits}
          />
          <Input
            className="col-span-2"
            type="text"
            label="Extra key time"
            onClear={() => console.log("input cleared")}
            onValue={extraKeyTime}
            onValueChange={setExtraKeyTime}
          />
        </div>

        <div className="mt-10">
          <Button onPress={postManageOvertime} className="bg-zinc-700 text-white" variant="shadow">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageOvertime;
