import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const BagIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        opacity="0.4"
        d="M8.30713 8.44741V7.65141C8.30713 5.805 9.79246 3.99142 11.6389 3.81908C13.8381 3.60572 15.6928 5.33724 15.6928 7.49549V8.62795"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5381 20.207H14.4619C17.7608 20.207 18.3516 18.8858 18.524 17.2774L19.1394 12.3536C19.361 10.3513 18.7866 8.71826 15.2825 8.71826H8.71748C5.21341 8.71826 4.63897 10.3513 4.86054 12.3536L5.47601 17.2774C5.64834 18.8858 6.23919 20.207 9.5381 20.207Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M14.8685 12.0008H14.8758"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M9.12309 12.0008H9.13046"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BagIcon;
