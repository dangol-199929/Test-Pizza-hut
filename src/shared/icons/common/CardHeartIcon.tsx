import React, { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<SVGSVGElement> {}
const CardHeartIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M10.3777 17.1003L10.3777 17.1003L10.3704 17.1029C10.3056 17.1257 10.1714 17.1501 10 17.1501C9.82862 17.1501 9.69438 17.1257 9.62962 17.1029L9.62963 17.1028L9.62231 17.1003C8.27995 16.6421 6.03683 15.4243 4.13923 13.48C2.25068 11.545 0.75 8.94061 0.75 5.6901C0.75 3.0108 2.90771 0.850098 5.56 0.850098C7.13147 0.850098 8.52255 1.60859 9.39788 2.78726C9.53937 2.97778 9.76269 3.0901 10 3.0901C10.2373 3.0901 10.4606 2.97778 10.6021 2.78726C11.477 1.60921 12.8778 0.850098 14.44 0.850098C17.0923 0.850098 19.25 3.0108 19.25 5.6901C19.25 8.94061 17.7493 11.545 15.8608 13.48C13.9632 15.4243 11.7201 16.6421 10.3777 17.1003Z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CardHeartIcon;
