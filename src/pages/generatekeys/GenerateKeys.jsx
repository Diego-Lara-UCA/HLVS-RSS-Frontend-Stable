import React from "react";
import Title from "../../components/title/Title";
import QrScanner from "qr-scanner";
import { useRef, useEffect, useState } from "react";
import { Button } from "@tremor/react";


const GenerateKeys = () => {

  const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

    const onScanSuccess = (result) => {
        // 🖨 Print the "result" to browser console.
        alert(result?.data);
    };

    useEffect(() => {
        if (!qrOn) console.log("QR Scanner is off");
    }, [qrOn]);

    // Fail
    const onScanFail = (err) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            // 👉 Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
                highlightCodeOutline: true,
                // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
            });

            // 🚀 Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // 🧹 Clean up on unmount.
        // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

  return (
    <div className="container-tab">
      <Title
        title="Generate Key"
        description="For your safety, do not share this key with anyone"
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
    </div>
  );
};

export default GenerateKeys;
