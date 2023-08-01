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

function ReturnConsult() {
  // Hooks
  const errorHandler = useErrorHandler();
  const { token, auth } = useAuth();

  // TODO: make patient match here
  // If we arrived here from patientList, we should have a patient already active
  const location = useLocation();
  let selectedPatientId = location.state?.selectedPatientId;

  // State
  const [formData, setFormData] = useState({
    patientId: selectedPatientId || "",
    sessionDate: "",
    complaint: "",
    sessionNotes: "",
    tongueNotes: "",
    pulseNotes: "",
    formulaName: "",
    composition: "",
    dosageAdministration: "",
    lifestyleAdvice: "",
    sendEmail: false,
  });
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(selectedPatientId);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get(patientRoutes.getAll + auth._id, {
          headers: { Authorization: `Basic ${token}` },
        });
        setPatients(res.data.patients);
      } catch (error) {
        errorHandler(error, setError);
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      patientId: activePatient,
      complaint: formData.complaint,
      sessionNotes: formData.sessionNotes,
      tongueNotes: formData.tongueNotes,
      pulseNotes: formData.pulseNotes,
    };

    const prescriptionData = {
      patientId: activePatient,
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
      sendEmail: formData.sendEmail,
    };

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
        <label htmlFor="patientName text-xl">Patient: </label>
        <select
          name="patientId"
          id="patientId"
          className="rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
          onChange={(e) => {
            setActivePatient(e.target.value);
            handleChange(e);
          }}
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
