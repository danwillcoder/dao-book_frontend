import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";

function KitchenSink() {
  return (
    <>
      <h1 className="text-center font-italiana text-6xl">Kitchen Sink Page</h1>
      <div className=" m-6 flex flex-col items-center gap-4">
        <h2 className=" text-3xl underline">Buttons</h2>
        <div className="grid w-1/4 grid-cols-2 gap-2">
          <p className="inline pr-2">Dark</p>
          <Button buttonText="Sign In" theme="dark" />
          <p className="inline pr-2">Neutral</p>
          <Button buttonText="Sign In" theme="neutral" />
          <p className="inline pr-2">Inverted</p>
          <Button buttonText="Sign In" theme="inverted" />
          <p className="inline pr-2">Light</p>
          <Button buttonText="Sign In" theme="light" />
        </div>
        <Button buttonText="Sign In" theme="light" isFullWidth={true} />
      </div>
      <div className="grid grid-cols-2 items-center gap-2 bg-daobook-amber p-4">
        <p className="text-end text-white">Light with subtitle</p>
        <TitleLockup theme="light" isSubtitled={true} />
        <p className="text-end text-white">Light no subtitle</p>
        <TitleLockup theme="light" isSubtitled={false} />
        <p className="text-end text-white">Dark with subtitle</p>
        <TitleLockup theme="dark" isSubtitled={true} />
      </div>
    </>
  );
}

export default KitchenSink;
