import React from "react";
import Title from "../../components/title/Title";
import QRCode from "qrcode.react";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@nextui-org/react";
import { set } from "date-fns";

const GenerateKeys = () => {
  const [qrCode, setQrCode] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [timeLeft, setTimeLeft] = useState();
  const [key, setKey] = useState("");
  const [graceTime, setGraceTime] = useState(0);

  const handleClick = () => {
    setQrCode(key);
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

  useEffect(() => {
    getGenerateKey();
  }, []);

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
      console.log(response);
      setKey(response.data.data.key);
      setGraceTime(response.data.data.graceTime);
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
            onClick={handleClick}
          >
            Generate QR code
          </Button>
        ) : (
          <>
            <div className="flex justify-center  items-center  flex-col gap-4">
              <QRCode size={250} value={qrCode} />
              <label className=" text-gray-600 ">
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
