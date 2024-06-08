import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="790954685497-bigp30hn4jggl1malsafuc23ufqgonim.apps.googleusercontent.com">
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
