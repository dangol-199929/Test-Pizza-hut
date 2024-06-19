import React, { HTMLAttributes, forwardRef } from "react";

interface SvgProps extends HTMLAttributes<SVGSVGElement> {}

const SearchIcon: React.FC<SvgProps> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        opacity="0.4"
        d="M16.2065 16.0002L19.2065 19.0002"
        stroke="#434343"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.70654 18.0002C14.401 18.0002 18.2065 14.1947 18.2065 9.50024C18.2065 4.80582 14.401 1.00024 9.70654 1.00024C5.01212 1.00024 1.20654 4.80582 1.20654 9.50024C1.20654 14.1947 5.01212 18.0002 9.70654 18.0002Z"
        stroke="#434343"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
