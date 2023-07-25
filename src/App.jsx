import DashboardButton from "./atoms/DashboardButton";
import { useState } from "react";

export default function App() {
  //TODO get user's first name from context
  const [userName, setUserName] = useState("");

  return (
    <div className="mt-20 flex flex-col items-center gap-7">
      <h1 className="text-4xl">
        Welcome to your clinic dashboard{" "}
        {userName ? `Dr. ${userName}.` : "Doctor."}{" "}
      </h1>
      <div className="flex gap-7">
        <DashboardButton buttonText="Initial Consult" />
        <DashboardButton buttonText="Return Consult" />
        <DashboardButton buttonText="Patient List" />
      </div>
    </div>
  );
}
