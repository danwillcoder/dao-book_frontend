import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  axiosInstance,
  prescriptionRoutes,
  sessionRoutes,
} from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useAuth from "../hooks/useAuth";
import useErrorHandler from "../hooks/errorHandler";

function InitialConsult() {
  const todaysDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    sessionDate: todaysDate,
    complaint: "",
    sessionNotes: "",
    tongueNotes: "",
    pulseNotes: "",
    formulaName: "",
    composition: "",
    dosageAdministration: "",
    lifestyleAdvice: "",
    sendEmail: false,
  });
  const [error, setError] = useState({});
  const errorHandler = useErrorHandler();

  const { patientId } = useLocation().state;
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      patientId,
      complaint: formData.complaint,
      sessionNotes: formData.sessionNotes,
      tongueNotes: formData.tongueNotes,
      pulseNotes: formData.pulseNotes,
    };

    const prescriptionData = {
      patientId,
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
    };

    try {
      const sessionRes = await axiosInstance.post(
        sessionRoutes.create,
        sessionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const prescriptionRes = await axiosInstance.post(
        prescriptionRoutes.create,
        prescriptionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(sessionRes);
      console.log(prescriptionRes);
    } catch (error) {
      console.log(error);
      errorHandler(error, setError);
    }
  };

  const handleChange = (e) => {
    setError(null);
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Can only reach page from initial-patient page
  if (!patientId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <ConsultForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={true}
      />
      {error && <p className="text-center font-bold">{error.message}</p>}
    </div>
  );
}

export default InitialConsult;
