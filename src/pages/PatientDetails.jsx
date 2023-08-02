import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance, patientRoutes, sessionRoutes } from "../api/routes";
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
  const [infoLoading, setInfoLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch sessions
  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  // Fetch initial patient data
  useEffect(() => {
    // Async function to allow us to await in useEffect
    const fetchPatientDetails = async () => {
      try {
        // Fetch data
        const res = await axiosInstance(patientRoutes.getOne + patientId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Pull out the data into a var to make it easier to work with
        const currentData = res.data.patient;
        // Fix date field to only contain date, otherwise it contains time info too
        if (currentData.dateOfBirth) {
          currentData.dateOfBirth = dateTimeToDate(currentData?.dateOfBirth);
        }
        setPatientInfo(currentData);
        setInfoLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPatientSessions = async () => {
      try {
        // Fetch data
        const res = await axiosInstance(sessionRoutes.getPatients + patientId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Pull out the data into a var to make it easier to work with
        const patientSessions = res?.data?.sessions;
        setSessionsLoading(false);
        setSessionsData(patientSessions);
        // Fix date field to only contain date, otherwise it contains time info too
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientDetails().catch((error) => console.log(error));
    fetchPatientSessions().catch((error) => console.log(error));
  }, [patientId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        patientRoutes.put + patientId,
        patientInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      setError(error);
    }
    setIsSaved(true);
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setPatientInfo((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Patient Profile</h1>
      {error && <p>{error.data.message}</p>}
      {infoLoading ? (
        <p>Loading...</p>
      ) : (
        <PatientInfoSubform
          formData={patientInfo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isInitialConsult={false}
          isSaved={isSaved}
        />
      )}

      {sessionsLoading ? (
        <p>Loading</p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {sessionsData.map((session) => {
            return (
              <Link
                to={`/return-consult`}
                key={session._id}
                state={{
                  selectedSessionId: session._id,
                  selectedPatientId: patientId,
                }}
                className="rounded-2xl border-4 border-[#E3E3E3] bg-white px-2 py-2 font-sans font-semibold text-black shadow-md transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
              >
                {new Date(session.sessionDate).toLocaleDateString("au", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Link>
            );
          })}
        </div>
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
