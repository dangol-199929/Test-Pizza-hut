
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> { }

const MailIcon: React.FC<Props> = ({ ...rest }) => {
    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.05466 6.06907C3.00024 7.0942 3.00024 8.74411 3.00024 12.0439C3.00024 15.3438 3.00024 16.9937 4.05466 18.0188C5.10908 19.0439 6.80613 19.0439 10.2002 19.0439H13.8002C17.1944 19.0439 18.8914 19.0439 19.9458 18.0188C21.0002 16.9937 21.0002 15.3438 21.0002 12.0439C21.0002 8.74411 21.0002 7.0942 19.9458 6.06907C18.8914 5.04395 17.1944 5.04395 13.8002 5.04395H10.2002C6.80613 5.04395 5.10908 5.04395 4.05466 6.06907ZM17.9188 8.12382C18.1574 8.40226 18.1188 8.81606 17.8324 9.04809L15.8555 10.6497C15.0578 11.296 14.4112 11.8199 13.8406 12.1767C13.2461 12.5484 12.6672 12.7832 12.0002 12.7832C11.3333 12.7832 10.7544 12.5484 10.1599 12.1767C9.58925 11.8199 8.94268 11.296 8.14496 10.6497L6.16812 9.04809C5.88173 8.81606 5.84304 8.40226 6.08169 8.12382C6.32035 7.84539 6.74598 7.80777 7.03237 8.0398L8.97537 9.61399C9.81504 10.2943 10.398 10.7651 10.8902 11.0728C11.3666 11.3707 11.6897 11.4707 12.0002 11.4707C12.3108 11.4707 12.6339 11.3707 13.1103 11.0728C13.6025 10.7651 14.1854 10.2943 15.0251 9.61399L16.9681 8.0398C17.2545 7.80777 17.6801 7.84539 17.9188 8.12382Z" fill="white" />
        </svg>
    );
};

export default MailIcon;
