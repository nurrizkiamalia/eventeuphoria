import Button from "../Button/Button"

const CTA: React.FC = () => {
    return(
        <>
            <div className="py-10 lg:py-20 px-5 lg:px-10 flex flex-col gap-5  bg-hero-image relative text-white bg-bottom">
                <div className="bg-black opacity-60 top-0 left-0 absolute h-full w-full z-0 ">
                </div>
                <div className="z-10 flex flex-col justify-center items-center lg:flex-row lg:justify-between text-center gap-6">
                    <div className="flex flex-col gap-3 items-start">
                        <h1 className=" font-semibold text-tXxl">Host with ease - create your event!</h1>
                        <p>Effortlessly design and manage your event. Start creating now and watch your vision come to life!</p>
                    </div>
                    <Button className="!bg-dspDarkPurple hover:!bg-dspPurple border-2 border-white shadow-eventBox shadow-white">Create Event</Button>
                </div>
            </div>
        </>
    )
}

export default CTA