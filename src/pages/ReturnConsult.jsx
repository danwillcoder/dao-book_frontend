import { useEffect, useState } from "react";
import {
  axiosInstance,
  patientRoutes,
  sessionRoutes,
  prescriptionRoutes,
} from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom/dist";
import { dateTimeToDate } from "../utils";

function ReturnConsult() {
  // Hooks
  const errorHandler = useErrorHandler();
  const { token, auth } = useAuth();

  // If we arrived here from patientList, we should have a patient already active
  const location = useLocation();
  const selectedPatientId = location.state?.selectedPatientId;
  const selectedSessionId = location.state?.selectedSessionId;

  // State
  const [formData, setFormData] = useState({
    patientId: selectedPatientId || "",
    sessionId: selectedSessionId || "",
    sessionDate: "",
    mainComplaint: "",
    sessionNotes: "",
    tongue: "",
    pulse: "",
    formulaName: "",
    composition: "",
    dosageAdministration: "",
    lifestyleAdvice: "",
    sendEmail: false,
  });
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [error, setError] = useState({});

  // Fetch initial data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get(patientRoutes.getAll + auth._id, {
          headers: { Authorization: `Basic ${token}` },
        });
        setPatients(res.data.patients);

        // If this exists, we're editing, so we need to set the name and hide the select
        if (selectedPatientId) {
          setActivePatient(
            res.data.patients.find((patient) => {
              return patient._id === selectedPatientId;
            })
          );
        }
      } catch (error) {
        errorHandler(error, setError);
      }
    };

    // If we're editing, we need to get previous data
    const fetchSessionDetails = async () => {
      try {
        const sessionRes = await axiosInstance.get(
          sessionRoutes.getOne + selectedSessionId,
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );
        const returnedSessionData = sessionRes.data?.session;

        const prescriptionRes = await axiosInstance.get(
          prescriptionRoutes.getOne + selectedSessionId,
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );
        const returnedPrescriptionData = prescriptionRes.data?.prescriptions[0];

        const newSessionData = {
          sessionDate: returnedSessionData?.sessionDate,
          sessionNotes: returnedSessionData?.sessionNotes,
          tongue: returnedSessionData?.tongue,
          pulse: returnedSessionData?.pulse,
          mainComplaint: returnedSessionData?.mainComplaint,
          formulaName: returnedPrescriptionData?.formulaName,
          composition: returnedPrescriptionData?.composition,
          dosageAdministration: returnedPrescriptionData?.dosageAdministration,
          lifestyleAdvice: returnedPrescriptionData?.lifestyleAdvice,
          sendEmail: false,
        };

        setFormData({
          ...formData,
          ...newSessionData,
        });
      } catch (error) {
        console.log(error);
        errorHandler(error, setError);
      }
    };

    fetchPatients();
    // If there is a session, we need to fetch session details. We're editing
    if (selectedSessionId) {
      fetchSessionDetails();
    }
  }, []);

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      patientId: formData.patientId,
      mainComplaint: formData.mainComplaint,
      sessionNotes: formData.sessionNotes,
      tongue: formData.tongue,
      pulse: formData.pulse,
    };

    const prescriptionData = {
      patientId: formData.patientId,
      sessionId: formData.sessionId || "",
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
      sendEmail: formData.sendEmail,
    };

    // If there's a session, we're editing, so put requests
    if (selectedSessionId) {
      try {
        const sessionRes = await axiosInstance.put(
          sessionRoutes.put + formData.sessionId,
          sessionData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const prescriptionRes = await axiosInstance.put(
          // Update with prescriptionId from session
          prescriptionRoutes.put,
          prescriptionData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        errorHandler(error, setError);
      }
    } else {
      // If there's no session, this is a new session, so we post
      try {
        const sessionRes = await axiosInstance.post(
          sessionRoutes.create,
          sessionData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Use returned sessionId to send prescription
        const sessionId = sessionRes.data.session._id;
        prescriptionData.sessionId = sessionId;

        const prescriptionRes = await axiosInstance.post(
          prescriptionRoutes.create,
          prescriptionData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        errorHandler(error, setError);
      }
    }
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
      <div className="px-15 min-w-[500px] gap-4 text-center">
        {activePatient ? (
          <h1 className="text-center text-2xl">
            {activePatient.firstName} {activePatient.lastName}
          </h1>
        ) : (
          <>
            <label htmlFor="patientName text-xl">Patient: </label>
            <select
              name="patientId"
              id="patientId"
              className="rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
              onChange={handleChange}
              value={formData.patientId}
            >
              {patients.map((patient) => (
                <option
                  value={patient._id}
                  key={patient._id}
                >
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <ConsultForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={false}
      />
      {error && <p className="text-center font-bold">{error.message}</p>}
    </div>
  );
}

export default ReturnConsult;
