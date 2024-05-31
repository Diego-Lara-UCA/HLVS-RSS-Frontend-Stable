import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter.jsx";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="app">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}
export default App;
