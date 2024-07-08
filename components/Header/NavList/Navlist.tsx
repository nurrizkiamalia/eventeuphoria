import Link from "next/link";

interface navProps{
    className?: string
}

interface navItem{
    link: string;
    text: string;
}

const navlist  = [
    {link: "/", text: "Home"},
    {link: "/events", text: "Events"},
    {link: "/contact", text: "Help Center"}
]

const Navlist: React.FC<navProps> = ({className}) =>{
    return(
        <>
            <ul className={` ${className} flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-center`}>
                {navlist.map((item, index) => (
                    <li key={index} className="text-tXs hover:scale-105 transition-all duration-300 hover:text-dspPurple"><Link href={item.link}>{item.text} </Link></li>
                ))}
            </ul>
        </>
    )
}

export default Navlist