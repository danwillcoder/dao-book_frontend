import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import "./index.css";
import InitialConsult from "./pages/InitialConsult.jsx";
import InitialConsultPatient from "./pages/InitialConsultPatient.jsx";
import KitchenSink from "./pages/KitchenSink.jsx";
import Login from "./pages/Login.jsx";
import PageLayout from "./pages/PageLayout.jsx";
import PatientDetails from "./pages/PatientDetails.jsx";
import PatientList from "./pages/PatientList.jsx";
import PatientLogin from "./pages/PatientLogin.jsx";
import ProtectedPages from "./pages/ProtectedPages.jsx";
import Register from "./pages/Register.jsx";
import ReturnConsult from "./pages/ReturnConsult.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
            <Route
              path="/patient-login"
              element={<PatientLogin />}
            />
            <Route element={<ProtectedPages />}>
              <Route
                path="/"
                element={<App />}
              />
              <Route
                path="/initial-consult"
                element={<InitialConsultPatient />}
              />
              <Route
                path="/initial-session"
                element={<InitialConsult />}
              />
              <Route
                path="/return-consult"
                element={<ReturnConsult />}
              />
              <Route
                path="/patient-list"
                element={<PatientList />}
              />
              <Route
                path="/patient-list/:patientId"
                element={<PatientDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
