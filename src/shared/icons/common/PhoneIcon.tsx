

import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> { }

const PhoneIcon: React.FC<Props> = ({ ...rest }) => {
    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M10.0378 5.36012L10.6868 6.52305C11.2725 7.57253 11.0374 8.94927 10.115 9.87174C10.115 9.87175 10.115 9.87175 10.115 9.87175C10.1148 9.87186 8.99612 10.9908 11.0248 13.0194C13.0527 15.0474 14.1716 13.93 14.1724 13.9292C14.1725 13.9292 14.1725 13.9292 14.1725 13.9292C15.095 13.0068 16.4717 12.7716 17.5211 13.3573L18.6841 14.0064C20.2688 14.8908 20.456 17.1132 19.063 18.5061C18.226 19.3431 17.2006 19.9944 16.0672 20.0374C14.159 20.1097 10.9185 19.6268 7.66795 16.3762C4.41737 13.1257 3.93446 9.88517 4.0068 7.97703C4.04977 6.84355 4.70105 5.81818 5.53805 4.98118C6.931 3.58823 9.15342 3.77538 10.0378 5.36012Z" fill="white" />
        </svg>
    );
};

export default PhoneIcon;
