import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  axiosInstance,
  prescriptionRoutes,
  sessionRoutes,
} from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";

function InitialConsult() {
  // Hooks
  const locationState = useLocation().state;
  const patientId = locationState?.patientId;
  const errorHandler = useErrorHandler();
  const { token } = useAuth();

  // State
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
  const [isSaved, setIsSaved] = useState(false);

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
      sendEmail: formData.sendEmail,
    };

    try {
      const sessionRes = await axiosInstance.post(
        sessionRoutes.create,
        sessionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Use returned sessionId to send prescription
      const sessionId = sessionRes.data.session._id;
      prescriptionData.sessionId = sessionId;

      const prescriptionRes = await axiosInstance.post(
        prescriptionRoutes.create,
        prescriptionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true);
    } catch (error) {
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
        isSaved={isSaved}
      />
      {error && <p className="text-center font-bold">{error.message}</p>}
    </div>
  );
}

export default InitialConsult;
