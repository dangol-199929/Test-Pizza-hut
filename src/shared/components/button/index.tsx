import React from "react";
import { ButtonProps } from "./button.props";

const Button: React.FC<ButtonProps> = ({
  htmlType = "button",
  children,
  type = "primary",
  disabled = false,
  className,
  onClick,
  size = "md",
  icon,
  iconPosition = "left",
  outline = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
      className={`btn btn-${size} btn-${type} ${className ? className : ""} ${
        outline ? "btn-outline" : ""
      }`}
    >
      {loading ? (
        <span className={`loading loading-ring loading-${size}`} />
      ) : (
        ""
      )}
      {iconPosition === "left" ? icon : ""}
      {children}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};

export default Button;
