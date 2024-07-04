const Hero: React.FC = () => {
    return(
        <>
        <div className="text-center lg:h-[80vh] flex flex-col items-center justify-center px-5 py-20 bg-hero-image bg-cover bg-bottom relative text-white ">
            <div className="bg-black opacity-50 top-0 left-0 absolute h-full w-full z-0 ">
            </div>
            <div className="z-10 lg:w-[80%] flex flex-col justify-center gap-5">    
                <h1 className="text-tXxl lg:text-head2 xl:text-head1 font-bold capitalize">Feels the euphoria <br /> <span className="hero-text  text-transparent">start from here!</span> </h1>
                <p className="text-tLg">Discover the world of music, art, and entertain to make your day!</p>
            </div>
        </div>
        </>
    )
}

export default Hero