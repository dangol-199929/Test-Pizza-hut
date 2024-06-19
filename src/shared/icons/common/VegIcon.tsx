import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}
const VegIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="0.5"
        fill="white"
        stroke="green"
      />
      <rect x="5" y="5" width="10" height="10" rx="5" fill="green" />
    </svg>
  );
};

export default VegIcon;
