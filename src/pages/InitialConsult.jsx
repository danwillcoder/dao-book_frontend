import { useState } from "react";
import ConsultForm from "../components/ConsultForm";

function InitialConsult() {
  const [formData, setFormData] = useState({
    sessionDate: "",
    complaint: "",
    sessionNotes: "",
    tongueNotes: "",
    pulseNotes: "",
    formulaName: "",
    formulaComposition: "",
    formulaDosage: "",
    lifestyleNotes: "",
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
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <ConsultForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={true}
      />
    </div>
  );
}

export default InitialConsult;
