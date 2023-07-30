import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import PatientInfoSubform from "../components/PatientInfoForm";

function PatientDetails() {
  let params = useParams();
  const patientId = params.patientId;

  // Fetch patient info
  const [patientInfo, setPatientInfo] = useState({});
  const [infoLoading, setInfoLoading] = useState(false);

  // Fetch sessions
  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const actionButtonText = isSaved ? "Saved" : "Save";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(patientInfo));
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setPatientInfo((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Patient Profile</h1>
      {infoLoading ? (
        <p>Loading...</p>
      ) : (
        <form
          className="w-[700px]"
          onSubmit={handleSubmit}
        >
          <PatientInfoSubform
            formData={patientInfo}
            handleChange={handleChange}
          />
          {!isSaved && (
            <>
              <Button
                theme="light"
                isFullWidth={true}
                buttonText={actionButtonText}
              ></Button>
              <TextLink
                linkText={"Back to patient list"}
                linkDestination={"/patient-list"}
                className={"my-10 text-center"}
              ></TextLink>
            </>
          )}
        </form>
      )}
      <div className="mb-10"></div>
    </div>
  );
}

export default PatientDetails;
