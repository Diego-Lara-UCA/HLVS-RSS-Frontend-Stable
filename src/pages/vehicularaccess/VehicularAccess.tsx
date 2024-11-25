import React, { useRef, useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import QrScanner from "qr-scanner";
import mqtt from "mqtt";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IVerifyKeyRequest } from "@/interfaces/Guard";
import { verifyKey, verifyVehicularKey } from "@/services/guardService";

const VehicularAccess = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Conectando...");
  const [scanResult, setScanResult] = useState(null);
  const [getResponse, setGetResponse] = useState("");

  const handleScanSuccess = async (result: QrScanner.ScanResult) => {
    const requestData: IVerifyKeyRequest = {
      key: result.data,
      terminal: "VEHICULAR",
    };

    try {
      const response = await verifyVehicularKey(requestData);
      if (response.success) {
        toast.success("QR code scanned successfully for vehicular access");
      } else {
        toast.error(response.message || "Error scanning the QR code");
      }
    } catch (error) {
      console.error("Error verifying QR code:", error);
      toast.error("Error scanning the QR code");
    }
  };

  useEffect(() => {
    if (!qrOn) console.log("QR Scanner is off");
  }, [qrOn]);

  const onScanFail = (err) => {
    // console.log("QR Scan failed: ", err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, handleScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    const connectUrl =
      "wss://d326e3e9.ala.dedicated.aws.emqxcloud.com:8084/mqtt";
    const options = {
      keepalive: 30,
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      username: "adminHLVS",
      password: "oscarin777",
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };

    const mqttClient = mqtt.connect(connectUrl, options);
    mqttClient.on("connect", () => {
      setConnectStatus("Conectado");
    });
    mqttClient.on("error", (err) => {
      console.error("Error de conexión:", err);
      setConnectStatus("Error de conexión");
      mqttClient.end();
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      publishMessage("usuario/feeds/button1", "1");
      setScanResult(null);
    }
  }, [scanResult]);

  const publishMessage = (topic, message) => {
    if (client) {
      client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.log("Error al publicar:", error);
        } else {
          console.log(`Mensaje publicado al tópico ${topic}: ${message}`);
        }
      });
    } else {
      console.log("No conectado a MQTT");
    }
  };

  return (
    <div className="container-tab">
      <Title
        title="Vehicuar Access"
        description="Scan the QR code to give access to the Vehicular entrance"
      />

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="qr-reader relative max-w-xl">
          {/* QR */}
          <video ref={videoEl}></video>
          <div ref={qrBoxEl} className="qr-box"></div>
        </div>
      </div>

      <h2>Estado de la Conexión MQTT: {connectStatus}</h2>
      <ToastContainer stacked />
    </div>
  );
};

export default VehicularAccess;
