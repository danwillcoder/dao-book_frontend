import { useState } from "react";
import PatientInfoForm from "../components/PatientInfoForm";
import { axiosInstance, pracRoutes } from "../api/routes";

function InitialConsult() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    medications: "",
    history: "",
  });

  // TODO: submit to backend and update state accordingly (setHasSaved)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    const res = await axiosInstance.post(patientRoutes.create);
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
    <div className="flex flex-col">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <h1 className="w-[700px] text-4xl">Patient Profile</h1>
      <PatientInfoForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <hr className="my-20" />
    </div>
  );
}

export default InitialConsult;
