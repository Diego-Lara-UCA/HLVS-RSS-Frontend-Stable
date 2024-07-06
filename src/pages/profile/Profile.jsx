import React, { useState } from "react";
import Title from "../../components/title/Title";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  const handleTypeDocumentChange = (e) => {
    setTypeDocument(e.target.value);
  };

  const documents = [
    { key: "1", type: "DUI" },
    { key: "2", type: "Passport" },
  ];

  const registerProfileUser = () => {
    if (
      name === "" ||
      email === "" ||
      typeDocument === "" ||
      documentNumber === ""
    ) {
      toast("Please fill all the fields", {
        type: "error",
      });
      return;
    }

    axios({
      method: "POST",
      url: `https://api.securityhlvs.com/api/users/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        email: email,
        documentType: typeDocument,
        documentNumber: documentNumber,
        userType: "GUEST",
      },
    }).then((respone) => {
      console.log(respone);
    });
  };

  return (
    <div className="container-tab">
      <Title
        title="Profile"
        description="Set up your environment, don't share your personal information"
      />
      <form className="mt-8">
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          <Input
            className="col-span-2"
            type="text"
            label="Name"
            onClear={() => console.log("input cleared")}
            value={name}
            onValueChange={setName}
          />
          <Input
            className="col-span-2"
            type="email"
            label="Email"
            onClear={() => console.log("input cleared")}
            value={email}
            onValueChange={setEmail}
          />
          <Select
            label="Type of document"
            selectedKeys={[typeDocument]}
            onChange={handleTypeDocumentChange}
          >
            {documents.map((document) => (
              <SelectItem key={document.type}>
                {document.type.toUpperCase()}
              </SelectItem>
            ))}
          </Select>
          <Input
            type="text"
            label="Document number"
            onClear={() => console.log("input cleared")}
            value={documentNumber}
            onValueChange={setDocumentNumber}
          />
        </div>
        <div className="mt-8">
          <Button
            className="bg-zinc-700 text-white"
            variant="shadow"
            onPress={registerProfileUser}
          >
            Save changes
          </Button>
        </div>
      <ToastContainer stacked />
      </form>
    </div>
  );
};

export default Profile;
