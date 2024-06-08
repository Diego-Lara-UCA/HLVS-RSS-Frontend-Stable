import React from "react";
import Title from "../../components/title/Title";
import { Button, Divider, Input, RadioGroup, Radio, Textarea } from "@nextui-org/react";

const AnonymousAccess = () => {
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
          />
          <Textarea
            className="col-span-2"
            type="text"
            label="Reason for visit"
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="mt-5">
          <RadioGroup
            label="Select the type of entrance"
            orientation="horizontal"
          >
            <Radio className="mr-4" value="buenos-aires">
              Pedestrian
            </Radio>
            <Radio value="sydney">Vehicular</Radio>
          </RadioGroup>
        </div>
        <Divider className="hidden 2xl:block my-10" />
        <Button
          className="mt-10 2xl:mt-0 float-end 2xl:float-start text-white bg-indigo-500"
          variant="flat"
        >
          Open entry
        </Button>
      </form>
    </div>
  );
};

export default AnonymousAccess;
