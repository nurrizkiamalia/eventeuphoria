import { ReactNode } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

interface btnProps{
    className?: string;
    children?: JSX.Element | ReactNode;
    icon?: JSX.Element;
    onclick?: () => void;

}

const Button: React.FC<btnProps> = ({children, className, icon, onclick}) => {
    return(
        <>
            <button className={` bg-dspDarkPurple hover:bg-dspGray text-white py-1 pl-5 pr-1 rounded-full hover:scale-105 ease-in-out transition-all duration-500 flex gap-3 items-center justify-between  ${className}`} onClick={onclick}>{children}  <span className="bg-dspLightPurple p-1 rounded-full "><RiArrowRightUpLine className="text-tXl text-dspDarkPurple"/></span></button>
        </>
    )
}

export default Button;