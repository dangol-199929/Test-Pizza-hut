import React, { HTMLAttributes, forwardRef } from "react";

interface SvgProps extends HTMLAttributes<SVGSVGElement> {}

const TrashIcon: React.FC<SvgProps> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3005 4.11677C13.5993 3.84908 10.8819 3.71118 8.17261 3.71118C6.56649 3.71118 4.96037 3.7923 3.35425 3.95453L1.69946 4.11677"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.16101 3.29748L6.33947 2.23485C6.46926 1.46424 6.5666 0.888306 7.93747 0.888306H10.0627C11.4336 0.888306 11.5391 1.49668 11.6607 2.24296L11.8392 3.29748"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5566 6.68005L14.0294 14.8485C13.9402 16.1221 13.8671 17.1117 11.604 17.1117H6.39626C4.1331 17.1117 4.06009 16.1221 3.97086 14.8485L3.4436 6.68005"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.64539 12.6503H10.3466"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.97192 9.40558H11.0278"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
