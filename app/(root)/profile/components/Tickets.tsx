import Image from "next/image";
import featuredImg from "@/public/assets/art-exhibition.webp"
import Link from "next/link";

const Tickets: React.FC = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex text-white justify-center">
            <div className="flex flex-col justify-center gap-3 p-5 bg-black rounded-l-xl rounded-r-3xl border-r-2 border-white border-dashed w-[40%]">
                <div className="overflow-hidden rounded-xl">
                    <Image
                    src={featuredImg}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-xl hover:scale-105 transition-all " />
                </div>
                <div className="">
                    <p>July 10, 2024</p>
                    <p>Friday</p>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-3 p-5 bg-dspDarkPurple rounded-l-3xl rounded-r-xl w-[60%] ">
                <div>
                    <h3 className="font-bold  text-tXl">Art Exhibition</h3>
                    <h3 className="font-bold "> Art</h3>
                    <p className="text-tLg font-medium text-dspSmokeWhite">Bandung, studio XYZ</p>
                </div>
                <hr className="border-dashed" />
                <div className="">
                    <p>Total price</p>
                    <p className="">IDR <span className="font-bold text-tLg">150000</span> for 4 tickets</p>
                </div>
            </div>
        </div>
        <div className="flex text-white justify-center">
            <div className="flex flex-col justify-center gap-3 p-5 bg-black rounded-l-xl rounded-r-3xl border-r-2 border-white border-dashed w-[40%]">
                <div className="overflow-hidden rounded-xl">
                    <Image
                    src={featuredImg}
                    alt="image"
                    width={300}
                    height={300}
                    className="rounded-xl hover:scale-105 transition-all " />
                </div>
                <div className="">
                    <p>July 10, 2024</p>
                    <p>Friday</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-dspDarkPurple rounded-l-3xl rounded-r-xl w-[60%] justify-center ">
                <div>
                    <Link href="" className="font-bold  text-tXl hover:scale-110 transition-all">Art Exhibition</Link>
                    <h3 className="font-bold "> Art</h3>
                    <p className="text-tLg font-medium text-dspSmokeWhite">Bandung, studio XYZ</p>
                </div>
                <hr className="border-dashed" />
                <div className="">
                    <p>Total price</p>
                    <p className="">IDR <span className="font-bold text-tLg">150000</span> for 4 tickets</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Tickets