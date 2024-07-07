import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import QRCode from "qrcode.react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { Button } from "@nextui-org/react";

const GenerateKeys = () => {
  const initialQrCode = localStorage.getItem("qrCode") || "";
  const initialTimeLeft = parseInt(localStorage.getItem("timeLeft"), 10) || 0;
  const initialGraceTime = localStorage.getItem("graceTime") || "00:00";
  const initialCreationTime = localStorage.getItem("creationTime") || "";

  const [qrCode, setQrCode] = useState(initialQrCode);
  const [showButton, setShowButton] = useState(!initialQrCode);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [key, setKey] = useState("");
  const [graceTime, setGraceTime] = useState(initialGraceTime);
  const [creationTime, setCreationTime] = useState(initialCreationTime);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  console.log(`Total de segundos desde la medianoche: ${totalSeconds}`);

  function convertToSeconds(timeStr) {
    if (!timeStr) return 0;

    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
      const [hours, minutes] = parts;
      return hours * 3600 + minutes * 60;
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  }

  const creationSeconds = convertToSeconds(creationTime);
  const graceTimeSeconds = convertToSeconds(graceTime);
  const totalGraceTime = creationSeconds + graceTimeSeconds;
  console.log(`Total de segundos de gracia: ${totalGraceTime}`);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeLeft", newTime.toString());
          return newTime;
        });
      } else if (timeLeft === 0 && qrCode) {
        setShowButton(true);
        setQrCode("");
        localStorage.removeItem("qrCode");
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("graceTime");
        localStorage.removeItem("creationTime");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, qrCode]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const token = localStorage.getItem("token");
  let emailUser = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    emailUser = decodedToken.email;
  }

  function getGenerateKey() {
    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/residential/permission/create-resident`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: emailUser,
      },
    }).then((response) => {
      const newKey = response.data.data.key;
      const newGraceTime = response.data.data.graceTime;
      const newCreationTime = response.data.data.creationTime;
      const newTimeLeft = parseInt(newGraceTime.split(':')[1], 10) * 60;

      setKey(newKey);
      setGraceTime(newGraceTime);
      setCreationTime(newCreationTime);
      setTimeLeft(newTimeLeft);

      localStorage.setItem("qrCode", newKey);
      localStorage.setItem("timeLeft", newTimeLeft.toString());
      localStorage.setItem("graceTime", newGraceTime);
      localStorage.setItem("creationTime", newCreationTime);

      setShowButton(false);
    }).catch((error) => {
      console.error('Error al generar la clave:', error);
    });
  }

  return (
    <div className="container-tab">
      <Title
        title="Generate Key"
        description="For your safety, do not share this key with anyone"
      />

      <div className="mt-10">
        {showButton ? (
          <Button
            variant="flat"
            className="bg-zinc-700 text-white"
            onClick={getGenerateKey}
          >
            Generate QR code
          </Button>
        ) : (
          <>
            <div className="flex justify-center items-center flex-col gap-4">
              <QRCode size={250} value={qrCode} />
              <label className="text-gray-600">
                The QR code will expire in:{" "}
                <span className="text-red-500">{formatTime(timeLeft)}</span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateKeys;
