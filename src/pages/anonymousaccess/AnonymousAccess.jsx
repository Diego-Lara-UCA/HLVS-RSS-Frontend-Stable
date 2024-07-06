import React from "react";
import Title from "../../components/title/Title";
import {
  Button,
  Divider,
  Input,
  RadioGroup,
  Radio,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AnonymousAccess = () => {
  const [visitantName, setVisitantName] = React.useState("");
  const [reasonForVisit, setReasonForVisit] = React.useState("");
  const [typeOfEntrance, setTypeOfEntrance] = React.useState("");

  function sendAnonymousAccess() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // Formato HH:MM:SS

    console.log(formattedDate)
    console.log(formattedTime)

    if (visitantName === "" || reasonForVisit === "" || typeOfEntrance === "") {
      toast("Please fill all the fields", {  type: "error", });
    }

    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/anonymous-access`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: visitantName,
        reason: reasonForVisit,
        type: typeOfEntrance,
        date: formattedDate,
        time: formattedTime,
      },
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="container-tab">
      <Title
        title="Anonymous Access"
        description="Pay attention to who walks through that door"
      />
      <form className="mt-8">
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Input
            className="col-span-2"
            type="text"
            label="Visitant name"
            onClear={() => console.log("input cleared")}
            value={visitantName}
            onValueChange={setVisitantName}
          />
          <Textarea
            className="col-span-2"
            type="text"
            label="Reason for visit"
            onClear={() => console.log("input cleared")}
            value={reasonForVisit}
            onValueChange={setReasonForVisit}
          />
        </div>
        <div className="mt-5">
          <RadioGroup
            label="Select the type of entrance"
            orientation="horizontal"
            value={typeOfEntrance}
            onValueChange={setTypeOfEntrance}
          >
            <Radio className="mr-4" value="PEDESTRIAN">
              Pedestrian
            </Radio>
            <Radio value="VEHICULAR">Vehicular</Radio>
          </RadioGroup>
        </div>
        <div className="mt-8">
          <Button
            onPress={sendAnonymousAccess}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Open entry
          </Button>
        </div>
      </form>
      <ToastContainer stacked/>
    </div>
  );
};

export default AnonymousAccess;
