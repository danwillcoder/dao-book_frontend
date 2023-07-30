import MemoFormInput from "../molecules/FormInput";
function PatientInfoSubform({ handleChange, formData }) {
  //TODO render formData as each input's default value
  const defaultDOBValue = "1990-01-01";
  return (
    <>
      <MemoFormInput
        type="text"
        name="firstName"
        labelText="First Name"
        placeholderText="Susan"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["firstName"]}
      ></MemoFormInput>
      <MemoFormInput
        type="text"
        name="lastName"
        labelText="Last Name"
        placeholderText="Reynolds"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["lastName"]}
      ></MemoFormInput>
      <MemoFormInput
        type="email"
        name="email"
        labelText="Email"
        placeholderText="susan@example.com"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["email"]}
      ></MemoFormInput>
      <MemoFormInput
        type="date"
        name="dateOfBirth"
        labelText="Date of Birth"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["dateOfBirth"] || defaultDOBValue}
      ></MemoFormInput>
      <MemoFormInput
        type="text"
        name="phone"
        labelText="Phone Number"
        placeholderText="0401 234 567"
        onChange={handleChange}
        defaultValue={formData["phone"]}
      ></MemoFormInput>
      <MemoFormInput
        type="textArea"
        name="medications"
        labelText="Medications"
        placeholderText=""
        onChange={handleChange}
        defaultValue={formData["medications"]}
      ></MemoFormInput>
      <MemoFormInput
        type="textArea"
        name="history"
        labelText="Health history"
        placeholderText=""
        onChange={handleChange}
        defaultValue={formData["history"]}
      ></MemoFormInput>
    </>
  );
}

export default PatientInfoSubform;
