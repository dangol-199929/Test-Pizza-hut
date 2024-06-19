import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const FooterBullet: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      id="Group_46328"
      data-name="Group 46328"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1.5"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#00ae4d" />
          <stop offset="1" stopColor="#3aa268" />
        </linearGradient>
      </defs>
      <circle
        id="Ellipse_1609"
        data-name="Ellipse 1609"
        cx="5"
        cy="5"
        r="5"
        fill="url(#linear-gradient)"
      />
      <circle
        id="Ellipse_1610"
        data-name="Ellipse 1610"
        cx="3"
        cy="3"
        r="3"
        transform="translate(2 2)"
        fill="#fff"
      />
    </svg>
  );
};

export default FooterBullet;
