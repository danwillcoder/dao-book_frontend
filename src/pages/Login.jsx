import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import TitleLockup from "../atoms/TitleLockup";
import FormInput from "../molecules/FormInput";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
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
          <FormInput
            type="email"
            name="email"
            labelText="Email"
            placeholderText="susan@example.com"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            labelText="Password"
            placeholderText="*****"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <Button
            theme="light"
            isFullWidth={true}
            buttonText="Login"
          ></Button>
        </form>
        <TextLink
          linkText="Sign up here"
          linkDestination={"/register"}
          paragraphText="TCM Practitioner?"
          className="mt-40"
        />
      </div>
    </div>
  );
}

export default Login;
