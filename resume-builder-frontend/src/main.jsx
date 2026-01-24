import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";
import "./index.css";

function Providers() {
  const { user } = useAuth();

  return (
    <ResumeProvider key={user?.id || "guest"}>
      <App />
    </ResumeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Providers />
    </AuthProvider>
  </BrowserRouter>
);
