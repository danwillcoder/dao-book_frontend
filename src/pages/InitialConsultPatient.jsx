import { useState } from "react";
import { axiosInstance, patientRoutes } from "../api/routes";
import PatientInfoForm from "../components/PatientInfoForm";
import useAuth from "../hooks/useAuth";

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

  // TODO: submit to backend and update state accordingly (setHasSaved)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(patientRoutes.create, formData, {
        headers: { Authorization: `Basic ${token}` },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
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
      />
      {error && <p>{error}</p>}
      <hr className="my-20" />
    </div>
  );
}

export default InitialConsultPatient;
