import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const pracRoutes = {
  register: "/prac",
  login: "/prac/login",
  get: "/prac/",
};

const patientRoutes = {
  getAll: "/patients/prac/",
  getOne: "/patient/",
  put: "/patient/",
  create: "/patient",
};

const sessionRoutes = {
  getAll: "/sessions/prac/",
  getOne: "/session/",
  getPatients: "/sessions/patient/",
  put: "/session/",
  create: "/session",
};

const prescriptionRoutes = {
  getOne: "/prescription/session/",
  put: "/prescription/",
  create: "/prescription",
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export {
  axiosInstance,
  pracRoutes,
  patientRoutes,
  sessionRoutes,
  prescriptionRoutes,
};
