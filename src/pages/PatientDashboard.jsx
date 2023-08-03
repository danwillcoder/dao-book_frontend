import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { axiosInstance, patientViewRoutes } from "../api/routes";
import SessionList from "../components/SessionList";

function PatientDashboard() {
  const { token } = useAuth();
  const location = useLocation();
  const patientId = location?.state?.patientId;

  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientSessions = async () => {
      try {
        // Fetch data
        const res = await axiosInstance(
          patientViewRoutes.getSessions + patientId,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Pull out the data into a var to make it easier to work with
        console.log(res);
        const patientSessions = res?.data?.sessions;
        setSessionsLoading(false);
        setSessionsData(patientSessions);
        // Fix date field to only contain date, otherwise it contains time info too
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientSessions().catch((error) => console.log(error));
  }, [patientId, token]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Past Sessions</h1>
      {sessionsLoading ? (
        <p>Loading...</p>
      ) : (
        <SessionList
          sessionsData={sessionsData}
          patientId={patientId}
          isPatientView={true}
        />
      )}
    </div>
  );
}

export default PatientDashboard;
