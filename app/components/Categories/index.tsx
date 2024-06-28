import { categories } from "@/data/data"
import Image from "next/image"

const Categories: React.FC = () => {
    return(
        <>
            <div className="categories flex items-center justify-between w-full gap-5 p-5 lg:p-10 overflow-x-auto">
                {categories.map((item, index) => (
                    <div key={index} className="w-full p-5 rounded-2xl flex flex-col gap-3 cursor-alias shadow-eventBox shadow-dspLightPurple hover:scale-105 transition-all duration-500 hover:bg-dspDarkPurple hover:text-white text-center">
                        <div className=" rounded-full bg-dspLightPurple p-5">    
                            <Image 
                            alt={`${item.category} image`}
                            src={`/assets/icons/${item.image}`}
                            width={50}
                            height={50} 
                            className="max-w-fit" />
                        </div>
                        <h2 className="whitespace-nowrap font-sourceSans font-semibold">{item.category}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Categories