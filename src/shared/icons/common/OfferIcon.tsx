import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const OfferIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
    >
      <path
        d="M3.33465 13.654L1.81238 12.1317C1.19145 11.5108 1.19145 10.4892 1.81238 9.8683L3.33465 8.346C3.59504 8.08561 3.80536 7.57484 3.80536 7.2143V5.06105C3.80536 4.17973 4.52644 3.45867 5.40777 3.45867H7.56099C7.92153 3.45867 8.4323 3.24839 8.69269 2.988L10.215 1.4657C10.8359 0.844767 11.8574 0.844767 12.4784 1.4657L14.0007 2.988C14.2611 3.24839 14.7718 3.45867 15.1323 3.45867H17.2856C18.1669 3.45867 18.888 4.17973 18.888 5.06105V7.2143C18.888 7.57484 19.0983 8.08561 19.3587 8.346L20.881 9.8683C21.5019 10.4892 21.5019 11.5108 20.881 12.1317L19.3587 13.654C19.0983 13.9144 18.888 14.4252 18.888 14.7857V16.9388C18.888 17.8201 18.1669 18.5413 17.2856 18.5413H15.1323C14.7718 18.5413 14.2611 18.7516 14.0007 19.012L12.4784 20.5343C11.8574 21.1552 10.8359 21.1552 10.215 20.5343L8.69269 19.012C8.4323 18.7516 7.92153 18.5413 7.56099 18.5413H5.40777C4.52644 18.5413 3.80536 17.8201 3.80536 16.9388V14.7857C3.80536 14.4151 3.59504 13.9044 3.33465 13.654Z"
        stroke="#FF8910"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.84668 13.5L13.8467 8.5"
        stroke="#FF8910"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4253 13.0834H13.4328"
        stroke="#FF8910"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25877 8.91667H9.26625"
        stroke="#FF8910"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OfferIcon;
