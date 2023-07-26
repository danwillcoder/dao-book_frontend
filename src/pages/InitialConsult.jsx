import { useState } from "react";
import Button from "../atoms/Button";
import FormInput from "../molecules/FormInput";

function InitialConsult() {
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
    <div className="flex flex-col">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <div className="flex flex-col flex-wrap content-center justify-center gap-4">
        <h1 className="w-[80%] text-4xl">Patient Profile</h1>
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
            type="date"
            name="dateOfBirth"
            labelText="Date of Birth"
            isRequired={true}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="text"
            name="phone"
            labelText="Phone Number"
            placeholderText="0401 234 567"
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="textArea"
            name="medications"
            labelText="Medications"
            placeholderText=""
            onChange={handleChange}
          ></FormInput>
          <FormInput
            type="textArea"
            name="history"
            labelText="Health history"
            placeholderText=""
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

export default InitialConsult;
