import Button from "@/components/Button/Button"
import Link from "next/link"

const Hero: React.FC = () => {
    return(
        <>
        <div className=" flex flex-col justify-center mx-5 lg:mx-10 my-10 px-5 lg:px-10 py-10 lg:py-20 rounded-xl bg-hero-image bg-cover bg-center relative text-white ">
            <div className="bg-black rounded-xl opacity-50 top-0 left-0 absolute h-full w-full z-0 ">
            </div>
            <div className="z-10 flex flex-col gap-5 justify-center">    
                <h1 className="text-tXxl lg:text-head2 xl:text-head1 font-bold capitalize">Feels the euphoria <br /> <span className="drop-shadow-lg shadow-white tracking-tighter">start from here!</span> </h1>
                <div className="flex flex-col gap-10">
                    <p className="text-tLg">Discover the world of music, art, and entertain to make your day!</p>
                    <Button className="w-fit shadow-eventBox shadow-white border-2 border-white"> <Link href="/events">Find Event</Link></Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Hero