import Link from "next/link";
import Register from "./[register]";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:items-center">
      <div className="m-0 flex justify-center lg:items-center bg-hero-image bg-cover bg-bottom relative h-[50vh] lg:min-h-screen w-full ">
        <div className="bg-black opacity-50 top-0 left-0 absolute h-full w-full z-0 "></div>
        <Link href="/" className="z-20 w-fit h-fit text-white font-bold text-head2 lg:text-head1 tracking-tighter">EventEuphoria</Link>
      </div>
      <div className="flex flex-col items-center justify-center -mt-56 lg:mt-0 py-10 lg:p-0 lg:w-full relative">
        <div className=" z-10 h-fit backdrop-blur-xl min-w-[350px] max-w-[500px] text-center rounded-xl p-10 shadow-boxed shadow-dspLightGray lg:shadow-none min-h-screen">
          <h1 className="text-tXxl font-bold text-white lg:text-black">
            Register
          </h1>
          <Register />
          <span>
            Have an account?{" "}
            <Link
              href="/login"
              className="text-dspPurple hover:scale-105 ease-in-out transition-all duration-500 hover:text-dspDarkPurple"
            >
              Login here
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
