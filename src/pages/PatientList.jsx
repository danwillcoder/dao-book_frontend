import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";

function PatientList() {
  const [userName, setUserName] = useState("");
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: "Tom",
      lastName: "Riddle",
    },
    {
      id: 2,
      firstName: "Susan",
      lastName: "Riddle",
    },
  ]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">
        Patient List for {userName ? `Dr. ${userName}.` : "Doctor."}
      </h1>
      <ul className="flex flex-col items-center gap-7">
        {patients.map((patient) => {
          return (
            <li
              className="min-w-[600px]"
              key={patient.id}
            >
              <Link
                to={`/patient-list/${patient.id}`}
                className="block w-full rounded-2xl border-4 border-[#E3E3E3] bg-white px-2 py-6 text-center font-sans font-semibold text-black shadow-md transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
              >
                {patient.firstName} {patient.lastName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PatientList;
