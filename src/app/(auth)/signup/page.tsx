import { SignUpForm } from "./singupForm";

const Page = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-center w-full items-center h-full">
        <h1 className="font-semibold mb-4 text-2xl">Signup</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
