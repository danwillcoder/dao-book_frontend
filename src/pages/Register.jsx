import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";
import FormInput from "../molecules/FormInput";

function Register() {
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
        <form className="px-15 flex max-w-2xl flex-col gap-4">
          <FormInput
            type="text"
            labelText="First Name"
            placeholderText="Susan"
            isRequired={true}
          ></FormInput>
          <FormInput
            type="text"
            labelText="Last Name"
            placeholderText="Reynolds"
            isRequired={true}
          ></FormInput>
          <FormInput
            type="email"
            labelText="Email"
            placeholderText="susan@example.com"
            isRequired={true}
          ></FormInput>
          <FormInput
            type="number"
            labelText="AHPRA no."
            placeholderText="1336"
            isRequired={true}
          ></FormInput>
          <FormInput
            type="password"
            labelText="Password"
            placeholderText="*****"
            isRequired={true}
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
