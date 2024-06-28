import Link from "next/link";
import Register from "./[register]";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center">
      <div className="m-0 flex justify-center items-center bg-hero-image bg-cover bg-bottom relative h-[50vh] lg:h-screen w-full ">
        <div className="bg-black opacity-50 top-0 left-0 absolute h-full w-full z-0 "></div>
      </div>
      <div className="flex flex-col items-center justify-center -mt-56 lg:mt-0 lg:w-full relative">
        <div className="bg-white opacity-50 top-5 left-0 absolute h-full w-full z-0 rounded-xl "></div>

        <div className=" z-10  h-fit backdrop-blur-xl min-w-[350px] max-w-[500px] border-[1px]  border-dspLightGray rounded-xl p-5 shadow-eventBox shadow-dspPurple ">
        
            <h1 className="font-montserrat text-tXl font-bold">
            Register a new account
            </h1>
            <Register />
            <span>
            Have an account?{" "}
            <Link href="/login" className="text-dspPurple hover:scale-105 ease-in-out transition-all duration-500 hover:text-dspDarkPurple">
                Login here
            </Link>{" "}
            </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
