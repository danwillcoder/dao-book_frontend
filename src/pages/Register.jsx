import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";
import FormInput from "../molecules/FormInput";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    AHPRA: 0,
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
      <div className="flex flex-col flex-wrap content-center justify-center gap-4">
        <h1 className="text-center text-4xl">Practitioner Registration</h1>
        <form
          className="px-15 flex max-w-2xl flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="text"
            name="firstName"
            labelText="First Name"
            placeholderText="Susan"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="text"
            name="lastName"
            labelText="Last Name"
            placeholderText="Reynolds"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            labelText="Email"
            placeholderText="susan@example.com"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="number"
            name="AHPRA"
            labelText="AHPRA no."
            placeholderText="1336"
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
            buttonText="Register"
          ></Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
