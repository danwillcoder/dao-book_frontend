import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance, patientRoutes } from "../api/routes";
import TextLink from "../atoms/TextLink";
import PatientInfoSubform from "../components/PatientInfoForm";
import useAuth from "../hooks/useAuth";
import { dateTimeToDate } from "../utils";

function PatientDetails() {
  const { token } = useAuth();
  let params = useParams();
  const patientId = params.patientId;

  // Fetch patient info
  const [patientInfo, setPatientInfo] = useState({});
  const [infoLoading, setInfoLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch sessions
  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axiosInstance(patientRoutes.getOne + patientId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const currentData = res.data.patient;
        // Fix date field to only contain date
        currentData.dateOfBirth = dateTimeToDate(currentData.dateOfBirth);
        setPatientInfo(res.data.patient);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientDetails().catch((error) => console.log(error));
  }, [patientId, token]);

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
      {error && <p>{error}</p>}
      {infoLoading ? (
        <p>Loading...</p>
      ) : (
        <PatientInfoSubform
          formData={patientInfo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isInitialConsult={false}
        />
      )}
      <TextLink
        linkText={"Back to patient list"}
        linkDestination={"/patient-list"}
        className={"my-10 text-center"}
      ></TextLink>
      <div className="mb-10"></div>
    </div>
  );
}

export default PatientDetails;
