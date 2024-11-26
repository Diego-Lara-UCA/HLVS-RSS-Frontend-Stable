import React, { useState } from "react";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createReport } from "@/services/reportService";
import { jwtDecode } from "jwt-decode";

const reportTypes = [
  { key: "SUSPICIOUS_ACTIVITY", label: "Suspicius activity" },
  { key: "PROPERTY_DAMAGE", label: "Property damage" },
  { key: "EXCESSIVE_NOISE", label: "Noise excessive" },
];

const FormCreateReport = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("SUSPICIOUS_ACTIVITY");

  const token = localStorage.getItem("token");
  let email = "";
  if (token) {
    const decodedToken: any = jwtDecode(token);
    email = decodedToken.email;
  }

  const handleSubmit = async () => {
    if (!description || !type) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const data = {
      description,
      type,
      email,
    };

    try {
      await createReport(data);
      toast.success("Reporte creado exitosamente.");
      setDescription("");
      setType("SUSPICIOUS_ACTIVITY");
    } catch (error: any) {
      console.error("Error al crear el reporte:", error);
      const errorMessage =
        error.response?.data?.message || "Hubo un error al crear el reporte.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col max-w-3xl gap-4">
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type here..."
          rows={4}
          required
        />
        <Select
          label="Type of report"
          selectedKeys={new Set([type])}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys).join("");
            setType(selectedKey);
          }}
          required
        >
          {reportTypes.map((report) => (
            <SelectItem key={report.key}>{report.label}</SelectItem>
          ))}
        </Select>
        <div className="mt-8 py-4 flex justify-center lg:justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Create Report
          </Button>
        </div>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default FormCreateReport;
