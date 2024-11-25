import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const reportTypes = [
  { key: "SUSPICIOUS_ACTIVITY", label: "Actividad sospechosa" },
  { key: "PROPERTY_DAMAGE", label: "Daño en la propiedad" },
  { key: "EXCESSIVE_NOISE", label: "Exceso de ruido" },
  { key: "INCIDENT", label: "Incidente" },
];

const FormCreateReport = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("SUSPICIOUS_ACTIVITY");

  const handleSubmit = async () => {
    if (!description || !type) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const token = localStorage.getItem("token"); // Obtener el token de autenticación
    if (!token) {
      toast.error("No se encontró un token de autenticación. Por favor, inicia sesión.");
      return;
    }

    try {
      // Realizar la solicitud al backend
      const response = await axios.post(
        "http://54.85.119.151:80/api/report/create",
        {
          description,
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluir el token en los headers
          },
        }
      );

      if (response.status === 201) {
        toast.success("Reporte creado exitosamente.");
        setDescription(""); // Limpiar los campos
        setType("SUSPICIOUS_ACTIVITY");
      }
    } catch (error) {
      console.error("Error al crear el reporte:", error);
      const errorMessage =
        error.response?.data?.message || "Hubo un error al crear el reporte.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col max-w-3xl gap-4">
        <h1 className="text-2xl font-bold mb-4">Crear Reporte</h1>
        <Textarea
          label="Descripción del Reporte"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingresa una breve descripción del problema..."
          rows={4}
          required
        />
        <Select
          label="Tipo de Reporte"
          selectedKeys={type}
          onSelectionChange={(value) => setType(value as string)}
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
            Crear Reporte
          </Button>
        </div>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default FormCreateReport;
