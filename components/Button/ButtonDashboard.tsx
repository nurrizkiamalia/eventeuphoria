import { ReactNode } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

interface ButtonProps {
  className?: string;
  children?: JSX.Element | ReactNode;
  onClick?: () => void;
}

const ButtonDashboard: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <>
      <HoverBorderGradient
        containerClassName="rounded-full shadow-boxed shadow-white hover:scale-105 transition-all duration-300"
        as="button"
        className={` flex items-center ${className}`}
        onClick={onClick}
      >
        {children}
      </HoverBorderGradient>
    </>
  );
};

export default ButtonDashboard;
