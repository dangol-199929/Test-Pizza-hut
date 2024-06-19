import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> { }

const LocationIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    // <svg
    //   {...rest}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="1rem"
    //   height="1rem"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   stroke="currentColor"
    //   strokeWidth="2"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    // >
    //   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    //   <circle cx="12" cy="10" r="3" />
    // </svg>
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M12.0002 20.0442C16.4185 20.0442 20.0002 18.4324 20.0002 16.4442C20.0002 15.4309 19.0699 14.5154 17.5726 13.8611C16.6589 15.5378 15.2656 16.983 13.4959 17.7393C12.5446 18.1458 11.4559 18.1458 10.5046 17.7393C8.73487 16.983 7.34158 15.5378 6.42791 13.8611C4.93061 14.5154 4.00024 15.4309 4.00024 16.4442C4.00024 18.4324 7.58197 20.0442 12.0002 20.0442Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.40027 9.25571C6.40027 6.37737 8.90747 4.04401 12.0003 4.04401C15.0931 4.04401 17.6003 6.37737 17.6003 9.25571C17.6003 12.1115 15.8129 15.444 13.0243 16.6357C12.3742 16.9135 11.6263 16.9135 10.9762 16.6357C8.1876 15.444 6.40027 12.1115 6.40027 9.25571ZM12.0003 11.244C12.8839 11.244 13.6003 10.5277 13.6003 9.64401C13.6003 8.76035 12.8839 8.04401 12.0003 8.04401C11.1166 8.04401 10.4003 8.76035 10.4003 9.64401C10.4003 10.5277 11.1166 11.244 12.0003 11.244Z" fill="white" />
    </svg>
  );
};

export default LocationIcon;
