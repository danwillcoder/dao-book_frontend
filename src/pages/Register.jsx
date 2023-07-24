import TitleLockup from "../atoms/TitleLockup";

function Register() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="flex items-center justify-center bg-daobook-amber p-10">
        <TitleLockup
          isSubtitled={true}
          theme="light"
        />
      </div>
      <div>
        <h1 className="text-4xl">Practitioner Registration</h1>

        <form></form>
      </div>
    </div>
  );
}

export default Register;
