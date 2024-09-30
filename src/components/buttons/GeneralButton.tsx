import React from "react";
import { IButtonProps } from "@/types/interfaces";

const GeneralButton: React.FC<IButtonProps> = ({
  onClick,
  children,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default GeneralButton;
