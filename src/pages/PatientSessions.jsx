import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance, patientViewRoutes } from "../api/routes";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";
import { dateTimeToDate } from "../utils";
import DetailDisplay from "../molecules/DetailDisplay";

function PatientSessions() {
  // Hooks
  const { token } = useAuth();
  const location = useLocation();
  const selectedPatientId = location.state?.selectedPatientId;
  const selectedSessionId = location.state?.selectedSessionId;
  const errorHandler = useErrorHandler();
  const [sessionData, setSessionData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const sessionRes = await axiosInstance.get(
          patientViewRoutes.getOneSession + selectedSessionId,
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );
        const returnedSessionData = sessionRes.data?.session;

        const prescriptionRes = await axiosInstance.get(
          patientViewRoutes.getPrescriptions + selectedPatientId,
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );
        const returnedPrescriptionData = prescriptionRes.data?.prescriptions;
        const currentPrescription = returnedPrescriptionData.find(
          (el) => el.sessionId === selectedSessionId
        );

        let prevSessionDate;

        if (returnedSessionData.sessionDate) {
          prevSessionDate = dateTimeToDate(returnedSessionData.sessionDate);
        }

        const newSessionData = {
          sessionDate: prevSessionDate || "",
          sessionNotes: returnedSessionData?.sessionNotes,
          tongue: returnedSessionData?.tongue,
          pulse: returnedSessionData?.pulse,
          mainComplaint: returnedSessionData?.mainComplaint,
          formulaName: currentPrescription?.formulaName,
          composition: currentPrescription?.composition,
          dosageAdministration: currentPrescription?.dosageAdministration,
          lifestyleAdvice: currentPrescription?.lifestyleAdvice,
        };

        setSessionData(newSessionData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        errorHandler(error, setError);
      }
    };
    fetchSessionDetails();
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? (
        <p className="mt-4 text-center text-2xl font-bold">Loading...</p>
      ) : (
        <>
          <h1 className="mx-2 my-10 text-center text-4xl">
            Notes from{" "}
            {new Date(sessionData?.sessionDate).toLocaleDateString("au", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
          </h1>
          <div className="m-auto max-w-[500px]">
            <DetailDisplay
              labelText="Main Complaint"
              valueText={sessionData.mainComplaint}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Session notes"
              valueText={sessionData.sessionNotes}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Tongue"
              valueText={sessionData.tongue}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Pulse"
              valueText={sessionData.pulse}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Formula name"
              valueText={sessionData.formulaName}
              isRequired={true}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Composition"
              valueText={sessionData.composition}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Dosage & administration"
              valueText={sessionData.dosageAdministration}
            ></DetailDisplay>
            <DetailDisplay
              labelText="Lifestyle notes"
              isRequired={true}
            ></DetailDisplay>
          </div>
        </>
      )}
    </div>
  );
}

export default PatientSessions;
