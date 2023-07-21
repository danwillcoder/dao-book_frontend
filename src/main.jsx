import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import KitchenSink from "./pages/KitchenSink.jsx";
import PageLayout from "./pages/PageLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          {process.env.NODE_ENV === "development" && (
            <Route path="/kitchen-sink" element={<KitchenSink />} />
          )}
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
