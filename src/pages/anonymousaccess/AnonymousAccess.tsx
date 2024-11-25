import React, { useState, useEffect } from "react";
import Title from "@/components/Title/Title";
import {
  Button,
  Divider,
  Input,
  RadioGroup,
  Radio,
  Textarea,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import mqtt from "mqtt";
import { sendAnonymousAccess } from "@/services/guardService";
import { IAnonymousAccessRequest } from "@/interfaces/Guard";

const AnonymousAccess = () => {
  const [visitantName, setVisitantName] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [typeOfEntrance, setTypeOfEntrance] = useState("");
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState('Conectando...');

  useEffect(() => {
    const connectUrl = 'wss://d326e3e9.ala.dedicated.aws.emqxcloud.com:8084/mqtt';
    const options = {
      keepalive: 30,
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      username: 'adminHLVS',
      password: 'oscarin777',
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };

    const mqttClient = mqtt.connect(connectUrl, options);
    mqttClient.on('connect', () => {
      setConnectStatus('Conectado');
    });
    mqttClient.on('error', (err) => {
      console.error('Error de conexión:', err);
      setConnectStatus('Error de conexión');
      mqttClient.end();
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  function emptyFields() {
    setVisitantName("");
    setReasonForVisit("");
    setTypeOfEntrance("");
  }

  const handleSendAccess = async () => {
    if (!visitantName || !reasonForVisit || !typeOfEntrance) {
      toast.error("Please fill all the fields");
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0];

    const requestData: IAnonymousAccessRequest = {
      name: visitantName,
      reason: reasonForVisit,
      type: typeOfEntrance,
      date: formattedDate,
      time: formattedTime,
    };

    try {
      const response = await sendAnonymousAccess(requestData);
      if (response.success) {
        toast.success(response.message || "Entry opened successfully");
        emptyFields();
      } else {
        toast.error(response.message || "Failed to open entry");
      }
    } catch (error) {
      toast.error("Error sending anonymous access request");
    }
  };

  const publishMessage = (topic, message) => {
    if (client) {
      client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.log('Error al publicar:', error);
        } else {
          console.log(`Mensaje publicado al tópico ${topic}: ${message}`);
        }
      });
    } else {
      console.log('No conectado a MQTT');
    }
  };

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
              <span className="text-sm">Pedestrian</span>
            </Radio>
            <Radio value="VEHICULAR">
              <span className="text-sm">Vehicular</span>
            </Radio>
          </RadioGroup>
        </div>
        <div className="mt-8">
          <Button
            onPress={handleSendAccess}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Open entry
          </Button>
        </div>
      </form>
      <ToastContainer stacked />
      <h2>Estado de la Conexión MQTT: {connectStatus}</h2>
    </div>
  );
};

export default AnonymousAccess;
