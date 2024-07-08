import Button from "../Button/Button"

const ExploreEvents: React.FC = () => {
    return(
        <>
        <div className="py-10 lg:py-20 px-5 lg:px-10 flex flex-col gap-5 justify-center items-center text-center bg-banner-image bg-cover relative text-white bg-center">
            <div className="bg-black opacity-60 top-0 left-0 absolute h-full w-full z-0 ">
            </div>
            <div className="flex flex-col gap-5 justify-center items-center text-center z-10">
                <h1 className="font-semibold text-head3">Discover Amazing Events</h1>
                <p>Browse through a wide variety of events and never miss out an unforgettable experience!</p>
                <Button className="!bg-dspDarkPurple hover:!bg-dspPurple border-2 border-white shadow-eventBox shadow-white">Explore Events</Button>
            </div>
        </div>
        </>
    )
}

export default ExploreEvents