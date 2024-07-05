import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqttConnection = () => {
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

  return { connectStatus, publishMessage };
};

export default useMqttConnection;
