import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { axiosInstance, sessionRoutes } from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useAuth from "../hooks/useAuth";

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

  const { patientId } = useLocation().state;
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      patientId,
      complaint: formData.complaint,
      sessionNotes: formData.sessionNotes,
      tongueNotes: formData.tongueNotes,
      pulseNotes: formData.pulseNotes,
    };
    const prescriptionData = {
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
    };

    try {
      const res = await axiosInstance.post(sessionRoutes.create, sessionData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res);
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
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
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default InitialConsult;
