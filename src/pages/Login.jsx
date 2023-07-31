import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { axiosInstance, pracRoutes } from "../api/routes";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import TitleLockup from "../atoms/TitleLockup";
import useAuth from "../hooks/useAuth";
import MemoFormInput from "../molecules/FormInput";
import { parseJwt } from "../utils.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const { auth, setAuth, setToken, setPracName } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    try {
      // Post form data
      const res = await axiosInstance.post(pracRoutes.login, formData);
      // Receive JWT and store in both state & localStorage
      const token = res.data.token;
      const decodedToken = parseJwt(token);
      setToken(token);
      setAuth(decodedToken);
      localStorage.setItem("auth", JSON.stringify(decodedToken));
      localStorage.setItem("authToken", JSON.stringify(res.data.token));
      // Use token to fetch practitioner name
      const pracNameRes = await axiosInstance.get(
        pracRoutes.get + decodedToken._id,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { firstName, lastName } = pracNameRes.data.prac;
      const fullName = `${firstName} ${lastName}`;
      setPracName(fullName);
      localStorage.setItem("pracName", JSON.stringify(fullName));

      // Redirect
      navigate("/");
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <>
      {auth ? (
        <Navigate to="/" />
      ) : (
        <div className="grid h-screen grid-cols-2">
          <div className="flex items-center justify-center bg-daobook-amber p-10">
            <TitleLockup
              isSubtitled={true}
              theme="light"
            />
          </div>
          <div className="flex flex-col flex-wrap content-evenly justify-center gap-4">
            <h1 className="text-6xl">Login</h1>
            <p className="text-2xl">Welcome back to clinic.</p>
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
                type="password"
                name="password"
                labelText="Password"
                placeholderText="*****"
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
            <TextLink
              linkText="Sign up here"
              linkDestination={"/register"}
              paragraphText="TCM Practitioner?"
              className="mt-40"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
