import { useState } from "react";
import ConsultForm from "../components/ConsultForm";

function ReturnConsult() {
  const [formData, setFormData] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    sessionDate: "",
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

  // TODO: submit to backend and update state accordingly (setHasSaved)
  // Does this also become live data they can update & resubmit?
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
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
      <h1 className="my-20 text-center text-4xl">Return Consult Form</h1>
      <h2 className="text-center text-3xl">
        Patient: {formData.patientName ? formData.patientName : "Error"}
      </h2>
      <ConsultForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={false}
      />
    </div>
  );
}

export default ReturnConsult;
