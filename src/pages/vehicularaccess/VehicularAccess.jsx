import React, { useRef, useEffect, useState } from "react";
import Title from "../../components/title/Title";
import QrScanner from "qr-scanner";
import useMqttConnection from "../../services/mqttConnection";

const VehicularAccess = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const { connectStatus, publishMessage } = useMqttConnection();

  const onScanSuccess = (result) => {
    // Imprime el resultado en la consola del navegador
    alert(result?.data);
    publishMessage('usuario/feeds/button1', '1');
  };

  useEffect(() => {
    if (!qrOn) console.log("QR Scanner is off");
  }, [qrOn]);

  // Fallo en el escaneo
  const onScanFail = (err) => {
    // Imprime el error en la consola del navegador
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // Instancia el escáner QR
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      // Inicia el escáner QR
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // Limpieza al desmontar el componente
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  return (
    <div className="container-tab">
      <Title
        title="Vehicular Access"
        description="Scan the QR code to give access to the vehicle entrance"
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
    </div>
  );
};

export default VehicularAccess;
