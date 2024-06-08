import React from "react";
import Title from "../../components/title/Title";
import QRCode from "qrcode.react";
import { useRef, useEffect, useState } from "react";

const GenerateKeys = () => {
  const [qrCode, setQrCode] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);

  const generateRandomString = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const handleClick = () => {
    const randomString = generateRandomString();
    setQrCode(randomString);
    setShowButton(false);
    setTimeLeft(600);
  };

  useEffect(() => {
    let timer;
    if (!showButton && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowButton(true);
      setQrCode("");
      setTimeLeft(600);
    }

    return () => clearInterval(timer);
  }, [showButton, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="container-tab">
      <Title
        title="Generate Key"
        description="For your safety, do not share this key with anyone"
      />

      <div className="flex justify-center items-center flex-col gap-4 mt-10">
        {showButton ? (
          <button
            className="font-semibold rounded-lg px-10 py-5 bg-gray-300 hover:bg-gray-400"
            onClick={handleClick}
          >
            Generar código QR
          </button>
        ) : (
          <>
            <QRCode size={250} value={qrCode} />
            <label className="mt-5 text-gray-600">
              El código QR expirará en:{" "}
              <span className="text-red-500">{formatTime(timeLeft)}</span>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateKeys;
