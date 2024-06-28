import { categories } from "@/data/data"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"

const Footer: React.FC = () =>{

    const links = [
        "events", "about", "contact", "create event" 
    ]

    const contact = [
        { contact: "email", data: "EventEuphoria@euphoria.com"},
        { contact: "phone number", data: "12345678910"},
        { contact: "office location", data: "Batam City"},
    ]

    const socialMedia = [
        { icon: <FaTiktok />, link: "https://www.tiktok.com/"},
        { icon: <FaYoutube />, link: "https://www.youtube.com/"},
        { icon: <FaInstagram />, link: "https://www.instagram.com/"},
        { icon: <FaFacebook />, link: "https://www.facebook.com/"}
    ]

    return(
        <>
        <div className="flex flex-col bg-black text-white">

        
        <div className="px-5 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
            <div className="flex flex-col gap-3">
                <h3 className="font-montserrat font-semibold text-tLg">Quick Link</h3>
                <ul className="list-none mb-4 flex flex-col gap-2">
                    {links.map((item, index) => (
                        <li key={index}><Link href="">{item} </Link></li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="font-montserrat font-semibold text-tLg">Contact Us</h3>
                <div className="flex flex-col gap-3">
                    {contact.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <span className="">Our {item.contact} at:</span>
                            <Link href="" className="font-montserrat font-medium text-tMd">{item.data} </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="font-montserrat font-semibold text-tLg">Categories</h3>
                <ul className="flex flex-col gap-2">
                    {categories.map((item, index) => (
                        <li key={index}><Link href="">{item.category} </Link></li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="font-montserrat font-semibold text-tLg">Event Update From Us</h3>
                <div className="flex gap-5">
                    {socialMedia.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <span className="text-2xl text-dspPurple">{item.icon}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
            <hr />
            <p className="font-montserrat font-semibold text-tSm text-center py-5">&copy; 2024 EventEuphoria. All right reserved.</p>
        </div>
        </>
    )
}

export default Footer