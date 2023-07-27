import { useState } from "react";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";

function ConsultForm({ handleSubmit, handleChange, isInitialConsult }) {
  const [isSaved, setHasSaved] = useState();
  const defaultDOBValue = "1990-01-01";
  const todayDateNoTime = new Date().toISOString().split("T")[0];
  const actionButtonText = isInitialConsult ? "Save" : "Edit";

  return (
    <div className="flex flex-col flex-wrap content-center justify-center gap-4">
      <form
        className="px-15 flex max-w-2xl flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {isInitialConsult ? (
          <>
            <h1 className="w-[700px] text-4xl">Patient Profile</h1>
            <MemoFormInput
              type="text"
              name="firstName"
              labelText="First Name"
              placeholderText="Susan"
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
              defaultValue={defaultDOBValue}
            ></MemoFormInput>
            <MemoFormInput
              type="text"
              name="phone"
              labelText="Phone Number"
              placeholderText="0401 234 567"
              onChange={handleChange}
            ></MemoFormInput>
            <MemoFormInput
              type="textArea"
              name="medications"
              labelText="Medications"
              placeholderText=""
              onChange={handleChange}
            ></MemoFormInput>
            <MemoFormInput
              type="textArea"
              name="history"
              labelText="Health history"
              placeholderText=""
              onChange={handleChange}
            ></MemoFormInput>
            <hr className="my-20" />
          </>
        ) : (
          <></>
        )}
        <MemoFormInput
          type="date"
          name="sessionDate"
          labelText="Session date"
          onChange={handleChange}
          defaultValue={todayDateNoTime}
        ></MemoFormInput>
        <MemoFormInput
          type="text"
          name="complaint"
          labelText="Main complaint"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="sessionNotes"
          labelText="Session notes"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="tongueNotes"
          labelText="Tongue"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="pulseNotes"
          labelText="Pulse"
          onChange={handleChange}
        ></MemoFormInput>
        <hr className="my-10" />
        <h2 className="w-[700px] text-3xl">Prescription</h2>
        <MemoFormInput
          type="text"
          name="formulaName"
          labelText="Formula name"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="formulaComposition"
          labelText="Composition"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="formulaDosage"
          labelText="Dosage & administration"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="lifestyleNotes"
          labelText="Lifestyle notes"
          onChange={handleChange}
        ></MemoFormInput>
        <MemoFormInput
          type="checkbox"
          name="sendEmail"
          labelText="Email prescription & lifestyle notes"
          onChange={handleChange}
        ></MemoFormInput>
        {!isSaved && (
          <Button
            theme="light"
            isFullWidth={true}
            buttonText={actionButtonText}
          ></Button>
        )}
      </form>
      {isSaved ? (
        <TextLink
          linkText={"Return to Dashboard"}
          linkDestination={"/"}
          className={"mb-10 text-center"}
        ></TextLink>
      ) : (
        <div className="mb-10"></div>
      )}
    </div>
  );
}

export default ConsultForm;
