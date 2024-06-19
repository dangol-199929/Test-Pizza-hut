import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

interface IProps {
  note: string;
  setNote: (note: string) => void;
}
const OrderNote = ({ note, setNote }: IProps) => {
  const loggedIn = getCookie("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!loggedIn);
  }, [loggedIn]);
  return (
    <div
      className={`bg-white py-4 mt-4 ${
        isLoggedIn ? "" : "opacity-50 cursor-not-allowed"
      }`}
    >
      <h1 className="text-xl font-semibold px-6 pb-4 mb-4 border-b-[1px]">
        Order Note
      </h1>
      <div className="mt-6 px-6">
        <textarea
          disabled={!isLoggedIn}
          className="w-full h-12 text-base bg-[#F0F3F5] rounded-lg min-h-[100px] p-4"
          value={note}
          rows={4}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default OrderNote;
