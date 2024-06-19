import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> { }

const PickupIcon: React.FC<Props> = ({ ...rest }) => {
    return (
        <svg {...rest} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.364 26.97H30.612C30.4431 26.1331 29.99 25.3804 29.3295 24.8394C28.669 24.2985 27.8417 24.0026 26.988 24.002H26.973L23.312 24.009V22.163C24.188 21.7979 24.9363 21.1818 25.4627 20.3922C25.9891 19.6026 26.27 18.6749 26.27 17.726V12.918H28.489C28.6853 12.918 28.8735 12.84 29.0123 12.7012C29.151 12.5624 29.229 12.3742 29.229 12.178C29.2292 11.2589 28.9847 10.3564 28.5207 9.56311C28.0566 8.76982 27.3898 8.11435 26.5886 7.66404C25.7875 7.21373 24.8809 6.9848 23.962 7.00078C23.0431 7.01676 22.145 7.27707 21.36 7.75496C21.271 7.74796 21.183 7.73996 21.094 7.73996C19.9172 7.73996 18.7887 8.20743 17.9566 9.03952C17.1245 9.87162 16.657 11.0002 16.657 12.177V12.917H15.917C15.5239 12.918 15.1474 13.075 14.8699 13.3534C14.5924 13.6318 14.4367 14.0089 14.437 14.402V15.881C14.4383 16.2728 14.5946 16.6482 14.8716 16.9253C15.1487 17.2024 15.5242 17.3586 15.916 17.36H16.656V17.73C16.6559 18.6336 16.9125 19.5186 17.396 20.282V24.012H13.7C12.7187 24.012 11.7776 24.4018 11.0837 25.0957C10.3898 25.7895 10 26.7307 10 27.712V39.543C10 39.7392 10.078 39.9274 10.2167 40.0662C10.2855 40.1349 10.367 40.1894 10.4568 40.2266C10.5466 40.2638 10.6428 40.283 10.74 40.283H42.364C42.5603 40.283 42.7485 40.205 42.8873 40.0662C43.026 39.9274 43.104 39.7392 43.104 39.543V27.71C43.104 27.5137 43.026 27.3255 42.8873 27.1867C42.7485 27.0479 42.5603 26.97 42.364 26.97ZM16.656 15.877H15.916V14.402H16.656V15.877ZM21.093 9.22096C21.1697 9.22428 21.2461 9.23162 21.322 9.24296L21.448 9.25796C21.6277 9.27918 21.8089 9.2344 21.958 9.13196C22.4613 8.78678 23.0422 8.57146 23.6489 8.5052C24.2556 8.43893 24.8693 8.52377 25.4352 8.75215C26.0012 8.98054 26.5019 9.34538 26.8927 9.81417C27.2835 10.283 27.5522 10.8411 27.675 11.439H18.231C18.3948 10.8041 18.7649 10.2416 19.2831 9.83998C19.8014 9.43832 20.4383 9.22022 21.094 9.21996L21.093 9.22096ZM18.135 12.921H24.791V17.728C24.791 18.6106 24.4404 19.4571 23.8163 20.0812C23.1921 20.7053 22.3456 21.056 21.463 21.056C20.5804 21.056 19.7339 20.7053 19.1097 20.0812C18.4856 19.4571 18.135 18.6106 18.135 17.728V12.921ZM21.835 22.513V24.613L20.879 27.002L18.879 24.495V21.771C19.6506 22.269 20.5496 22.5337 21.468 22.533C21.5913 22.533 21.7145 22.5256 21.837 22.511L21.835 22.513ZM11.481 27.713C11.4818 27.1244 11.7157 26.5601 12.1316 26.1437C12.5475 25.7273 13.1115 25.4925 13.7 25.491H17.78L20.516 28.908C20.5962 29.0099 20.7018 29.0889 20.8223 29.137C20.9427 29.1851 21.0737 29.2005 21.2021 29.1817C21.3304 29.163 21.4515 29.1107 21.5532 29.0301C21.6548 28.9496 21.7334 28.8436 21.781 28.723L23.075 25.491L26.975 25.484H26.982C27.4406 25.4864 27.8873 25.6306 28.2607 25.8968C28.6342 26.163 28.9162 26.5382 29.068 26.971H25.531C25.4338 26.971 25.3376 26.9901 25.2478 27.0273C25.158 27.0645 25.0765 27.119 25.0077 27.1877C24.939 27.2564 24.8845 27.338 24.8473 27.4278C24.8101 27.5176 24.791 27.6138 24.791 27.711V33.628H22.573C22.436 33.6265 22.3015 33.664 22.185 33.736C22.0685 33.8081 21.9749 33.9118 21.915 34.035L21.375 35.107H15.917V31.407C15.917 31.2107 15.839 31.0225 15.7003 30.8837C15.5615 30.7449 15.3733 30.667 15.177 30.667H11.477L11.481 27.713ZM26.271 38.802H11.479V32.147H14.437V35.847C14.437 36.0432 14.515 36.2314 14.6537 36.3702C14.7925 36.509 14.9807 36.587 15.177 36.587H21.833C21.97 36.5884 22.1045 36.5509 22.221 36.4789C22.3375 36.4068 22.4311 36.3032 22.491 36.18L23.031 35.108H25.531C25.7273 35.108 25.9155 35.1859 26.0543 35.3247C26.193 35.4635 26.271 35.6517 26.271 35.848V38.802ZM41.625 38.802H27.75V35.845C27.7478 35.3874 27.6046 34.9417 27.3399 34.5684C27.0753 34.1951 26.702 33.9125 26.271 33.759V31.408H41.625V38.802ZM41.625 29.927H26.271V28.449H41.625V29.927Z" fill="#555" />
        </svg>


    );
};

export default PickupIcon;