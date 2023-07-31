import { useState } from "react";
import { axiosInstance, patientRoutes } from "../api/routes";
import PatientInfoForm from "../components/PatientInfoForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function InitialConsultPatient() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    medications: "",
    history: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // TODO: submit to backend and update state accordingly (setHasSaved)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(patientRoutes.create, formData, {
        headers: { Authorization: `Basic ${token}` },
      });
      // useLocation() hook to get this data in the next page
      setError("");
      navigate("/initial-session", {
        state: { patientId: res.data.patient._id },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <PatientInfoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={true}
      />
      {error && <p>{error}</p>}
      <hr className="my-20" />
    </div>
  );
}

export default InitialConsultPatient;
