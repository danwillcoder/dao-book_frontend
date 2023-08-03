import { useState } from "react";
import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";
import { MemoFormInput } from "../molecules/FormInput";
import useAuth from "../hooks/useAuth";
import { patientViewRoutes } from "../api/routes";
import { parseJwt } from "../utils";
import { axiosInstance } from "../api/routes";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  // Hooks
  const { setToken, setAuth } = useAuth();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    email: "",
    dateOfBirth: "",
    lastName: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Post form data
      const res = await axiosInstance.post(patientViewRoutes.login, formData);
      // Receive JWT and store in both ctx & storage
      const token = res.data.token;
      const decodedToken = parseJwt(token);
      setToken(token);
      setAuth(decodedToken);
      localStorage.setItem("auth", JSON.stringify(decodedToken));
      localStorage.setItem("authToken", JSON.stringify(res.data.token));

      console.log(token, decodedToken);

      // Redirect
      navigate("/patient-dashboard", {
        state: { patientId: decodedToken._id },
      });
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const handleChange = (e) => {
    setError(null);
    const name = e.target.name;
    const value = e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[minmax(150px,_25%)_2fr]">
      <div className="flex items-center justify-center bg-daobook-amber">
        <TitleLockup
          isSubtitled={false}
          theme="light"
        />
      </div>
      <div className="flex flex-col flex-wrap content-evenly justify-center gap-4">
        <h1 className="text-6xl">Patient Login</h1>
        <form
          className="px-15 flex max-w-2xl flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <MemoFormInput
            type="email"
            name="email"
            labelText="Email"
            placeholderText="susan@example.com"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <MemoFormInput
            type="date"
            name="dateOfBirth"
            labelText="Date of Birth"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <MemoFormInput
            type="text"
            name="lastName"
            labelText="Last Name"
            placeholderText="Reynolds"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <Button
            theme="light"
            isFullWidth={true}
            buttonText="Login"
          ></Button>
          {error && (
            <>
              <p className="font-bold">
                Something went wrong, please try again.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default PatientLogin;
