import React, { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<SVGSVGElement> { }
const CaretDownIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      enableBackground="new 0 0 29 14"
      height="0.35rem"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 29 14"
      width="0.8rem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon fill="currentColor" points="0.15,0 14.5,14.35 28.85,0 " />
    </svg>
  );
};

export default CaretDownIcon;
