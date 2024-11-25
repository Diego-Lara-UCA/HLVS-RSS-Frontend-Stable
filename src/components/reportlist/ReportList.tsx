import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import PropTypes from "prop-types";

const ReportDetails = ({ reportId }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setError("");

    try {
      // Llamada al backend con el ID del reporte
      const response = await axios.get(
        `http://54.85.119.151:80/api/report/all`
      );

      // Asignar los datos del reporte
      setReport(response.data.data);
    } catch (err) {
      console.error("Error al obtener el reporte:", err);
      setError("No se pudo cargar el reporte. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reportId) fetchReport(); // Solo llama al backend si hay un ID disponible
  }, [reportId]);

  return (
    <div className="mt-5 flex flex-col max-w-4xl mx-auto">
      <Card className="mb-4 p-4">
        <h1 className="text-2xl font-bold">Detalles del Reporte</h1>
      </Card>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-600">Cargando reporte...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      ) : report ? (
        <Table
          aria-label="Detalles del reporte"
          className="max-w-full overflow-x-auto"
          shadow
        >
          <TableHeader>
            <TableColumn>Campo</TableColumn>
            <TableColumn>Valor</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{report.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>{report.nombre || "Desconocido"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>{report.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>{report.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>{new Date(report.date).toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-600">No se encontró el reporte.</span>
        </div>
      )}

      <Button onPress={fetchReport} color="secondary" className="mt-5">
        Recargar
      </Button>
    </div>
  );
};

// Validar las props esperadas
ReportDetails.propTypes = {
  reportId: PropTypes.string.isRequired, // Se espera un ID como string
};

export default ReportDetails;
