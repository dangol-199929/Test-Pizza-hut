import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const HeartIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#555555"
      viewBox="0 0 16 14"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );
};

export default HeartIcon;
