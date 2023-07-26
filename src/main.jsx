import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import KitchenSink from "./pages/KitchenSink.jsx";
import Login from "./pages/Login.jsx";
import PageLayout from "./pages/PageLayout.jsx";
import Register from "./pages/Register.jsx";
import InitialConsult from "./pages/InitialConsult.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          {process.env.NODE_ENV === "development" && (
            <Route
              path="/kitchen-sink"
              element={<KitchenSink />}
            />
          )}
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          {/* TODO Put this in a protected route */}
          <Route
            path="/"
            element={<App />}
          />
          <Route
            path="/initial-consult"
            element={<InitialConsult />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
