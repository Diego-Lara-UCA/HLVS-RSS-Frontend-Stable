import React, { useState } from "react";
import Title from "../../components/title/Title";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const navigate = useNavigate();

  const handleTypeDocumentChange = (e) => {
    setTypeDocument(e.target.value);
  };

  const documents = [
    { key: "1", type: "DUI" },
    { key: "2", type: "Passport" },
  ];

  const registerProfileUser = () => {
    if (!name || !email || !typeDocument || !documentNumber) {
      toast.error("Please fill all the fields");
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
        userType: "USER",
      },
    })
    .then(() => {
      toast.success("Profile registered successfully");
      emptyFields();
      navigate("/dashboard");
    })
    .catch((error) => {
      toast.error("Error registering profile");
      console.error(error);
    });
  };

  function emptyFields() {
    setName("");
    setEmail("");
    setTypeDocument("");
    setDocumentNumber("");
  }

  return (
    <div className="container-tab flex justify-center items-center flex-col h-[100vh] bg-gradient-to-tr from-zinc-700 to-zinc-900">
      <div className="bg-white rounded-md p-10">
        <Title
          title="Profile"
          description="To continue, complete the necessary information"
        />
        <div className="mt-2">
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
          <div className="mt-8 flex justify-center">
            <Button
              className="bg-zinc-700 text-white"
              variant="shadow"
              onPress={registerProfileUser}
            >
              Save changes
            </Button>
          </div>
          <ToastContainer stacked />
        </div>
      </div>
    </div>
  );
};

export default Profile;
