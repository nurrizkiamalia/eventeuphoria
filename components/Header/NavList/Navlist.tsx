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
            <ul className={` ${className} flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-center w-full`}>
                {navlist.map((item, index) => (
                    <li key={index} className=""><Link href={item.link}>{item.text} </Link></li>
                ))}
            </ul>
        </>
    )
}

export default Navlist