import React from "react";
import { Props } from "./confirmation-modal.props";
import { Button } from "../ui/button";

const ConfirmationModal: React.FC<Props> = ({
  confirmHeading,
  btnName,
  cancelBtnName,
  children,
  btnFunction,
  cancelFuntion,
  isLoading,
}) => {
  return (
    <>
      {/* <input type="checkbox" id={modalType} className="modal-toggle" defaultChecked />
            <div className="modal">
                <div className="rounded-lg modal-box"> */}
      <h3 className="text-lg font-bold">{confirmHeading}</h3>
      {children}
      <div className="flex items-center justify-center md:justify-end gap-[10px]">
        <Button onClick={btnFunction} disabled={isLoading}>
          <p>{btnName}</p>
          {isLoading && (
            <span className="w-5 h-5 border-4 border-white border-dotted rounded-full border-t-transparent animate-spin"></span>
          )}
        </Button>
        <Button onClick={cancelFuntion} variant={"secondary"}>
          {cancelBtnName ? cancelBtnName : "Cancel"}
        </Button>
      </div>
      {/* </div>
                <label onClick={cancelFuntion} className="modal-backdrop" htmlFor={modalType}>{cancelBtnName ? cancelBtnName : 'Cancel'}</label>
            </div> */}
    </>
  );
};

export default ConfirmationModal;
