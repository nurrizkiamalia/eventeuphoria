import { ReactNode } from "react";

interface btnProps{
    className?: string;
    children?: JSX.Element | ReactNode;
    onclick?: () => void;

}

const Button: React.FC<btnProps> = ({children, className, onclick}) => {
    return(
        <>
            <button className={` bg-dspPurple hover:bg-dspDarkPurple text-white py-2 px-7 rounded-full hover:scale-105 ease-in-out transition-all duration-500 ${className}`} onClick={onclick}>{children} </button>
        </>
    )
}

export default Button;