import DashboardButton from "./atoms/DashboardButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  //TODO get user's first name from context
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const initialConsultClick = () => {
    navigate("/initial-consult");
  };

  const returnConsultClick = () => {
    navigate("/return-consult");
  };

  const patientListClick = () => {
    navigate("/patient-list");
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-7">
      <h1 className="text-4xl">
        Welcome to your clinic dashboard{" "}
        {userName ? `Dr. ${userName}.` : "Doctor."}{" "}
      </h1>
      <div className="flex gap-7">
        <DashboardButton
          buttonText="Initial Consult"
          onClick={initialConsultClick}
        />
        <DashboardButton
          buttonText="Return Consult"
          onClick={returnConsultClick}
        />
        <DashboardButton
          buttonText="Patient List"
          onClick={patientListClick}
        />
      </div>
    </div>
  );
}
