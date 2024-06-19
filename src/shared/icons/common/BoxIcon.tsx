import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const BoxIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...rest}
    >
      <path
        d="M16.2464 11.8765L23.9131 19.8283V22.9939H6.81052L0.913086 15.0572V11.8765L6.81052 1.00635L23.9131 1.00757L16.2464 11.8765Z"
        fill="#FFC5C7"
      />
      <path
        d="M16.2464 11.8765L23.9131 19.8283M16.2464 11.8765H0.913086M16.2464 11.8765L23.9131 1.00757L6.81052 1.00635L0.913086 11.8765M23.9131 19.8283H6.81052M23.9131 19.8283V22.9939H6.81052M6.81052 19.8283L0.913086 11.8765M6.81052 19.8283V22.9939M0.913086 11.8765V15.0572L6.81052 22.9939"
        stroke="#363636"
      />
    </svg>
  );
};

export default BoxIcon;
