import { useState } from "react";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";
import PatientInfoSubform from "./PatientInfoForm";

function ConsultForm({
  handleSubmit,
  handleChange,
  isInitialConsult,
  formData,
}) {
  const [isSaved, setHasSaved] = useState();
  const [editMode, setEditMode] = useState(false);
  const actionButtonText = isInitialConsult ? "Save" : "Edit";

  //TODO render formData as each input's default value

  return (
    <div className="flex flex-col flex-wrap content-center justify-center gap-4">
      <form
        className="px-15 flex max-w-2xl flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <MemoFormInput
          type="date"
          name="sessionDate"
          labelText="Session date"
          onChange={handleChange}
          defaultValue={formData.sessionDate}
        ></MemoFormInput>
        <MemoFormInput
          type="text"
          name="complaint"
          labelText="Main complaint"
          onChange={handleChange}
          defaultValue={formData.complaint}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="sessionNotes"
          labelText="Session notes"
          onChange={handleChange}
          defaultValue={formData.sessionNotes}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="tongueNotes"
          labelText="Tongue"
          onChange={handleChange}
          defaultValue={formData.tongueNotes}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="pulseNotes"
          labelText="Pulse"
          onChange={handleChange}
          defaultValue={formData.pulseNotes}
        ></MemoFormInput>
        <hr className="my-10" />
        <h2 className="w-[700px] text-3xl">Prescription</h2>
        <MemoFormInput
          type="text"
          name="formulaName"
          labelText="Formula name"
          onChange={handleChange}
          defaultValue={formData.formulaName}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="composition"
          labelText="Composition"
          onChange={handleChange}
          defaultValue={formData.composition}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="dosageAdministration"
          labelText="Dosage & administration"
          onChange={handleChange}
          defaultValue={formData.dosageAdministration}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="lifestyleAdvice"
          labelText="Lifestyle notes"
          onChange={handleChange}
          defaultValue={formData.lifestyleAdvice}
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
