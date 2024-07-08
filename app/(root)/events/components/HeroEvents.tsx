const HeroEvents: React.FC = () => {
    return(
        <>
        <div className=" flex flex-col justify-center mx-5 lg:mx-10 my-10 px-5 lg:px-10 py-10 lg:py-20 rounded-xl bg-cta-image bg-cover bg-center relative text-white ">
            <div className="bg-black opacity-50 top-0 left-0 absolute h-full w-full z-0 rounded-xl ">
            </div>
            <div className="z-10 flex flex-col justify-center gap-5">    
                <h1 className="text-tXxl lg:text-head2 xl:text-head1 font-bold capitalize tracking-tighter">Find your event <br /> and have fun!</h1>
                <p className="text-tLg">There is a lot of event you need to unfold here.</p>
            </div>
        </div>
        </>
    )
}

export default HeroEvents