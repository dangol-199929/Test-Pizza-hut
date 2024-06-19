import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaAddressBook, FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { deleteAccount, logout } from "@/services/auth.service";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmationModal from "../confirmation-modal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const AccountSidebar = () => {
  const { pathname } = useRouter();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDelAccModal, setShowDelAccModal] = useState<boolean>(false);

  const listItemClass = `group text-gray-400 relative p-4 flex gap-2 items-center border-none md:border-b border-gray-350 border-solid text-[14px] hover:!text-primary`;
  const linkClass = "flex items-center gap-2 w-full h-full hover:text-primary";
  const iconClass = "group-hover:text-primary w-5 h-auto md:w-auto";
  const linkUrls = [
    {
      href: `/account/profile`,
      icon: <FaUserAlt className={iconClass} />,
      text: "My Profile",
    },
    {
      href: `/account/wishlist`,
      icon: <FaAddressBook className={iconClass} />,
      text: "Favorites",
    },
    {
      href: `/account/order`,
      icon: <FaShoppingBag className={iconClass} />,
      text: "My Orders",
    },
    {
      href: `/account/addresses`,
      icon: <FaAddressBook className={iconClass} />,
      text: "My Address",
    },
    {
      href: `/account/change-password`,
      icon: <RiLockPasswordFill className={iconClass} />,
      text: "Change Password",
    },
  ];

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      deleteCookie("token");
      deleteCookie("isLoggedIn");
      queryClient.invalidateQueries(["getCart"]);
      queryClient.invalidateQueries(["getCartList"]);
      router.push("/login");
      showToast(TOAST_TYPES.success, "Logged out successfully");
    },
  });

  const delAccMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      deleteCookie("token");
      deleteCookie("isLoggedIn");
      queryClient.invalidateQueries(["getCart"]);
      queryClient.invalidateQueries(["getCartList"]);
      showToast(TOAST_TYPES.success, data?.data?.message);
      router.push("/login");
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
    setShowModal(false);
    router.push("/");
  };

  const deleteAccountHandler = () => {
    delAccMutation.mutate();
    setShowDelAccModal(false);
  };

  return (
    <div className="py-6">
      <div className="w-full max-w-xs mr-auto sticky top-[120px] left-0 hidden md:block">
        <div className="w-full h-14 pl-6 pr-4 py-4 bg-white rounded-tl-xl rounded-tr-xl border border-gray-200 justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-zinc-800 text-lg font-bold relative">
            <div className="w-[3px] h-full bg-primary absolute top-0 -left-6"></div>
            MY ACCOUNT
          </div>
        </div>

        <div className="w-full h-96 flex-col justify-start items-start inline-flex rounded-b-xl">
          {linkUrls?.map((item: any, index: number) => (
            <Link
              href={item.href}
              key={`categories-${index}`}
              className={`w-full pl-4 pr-4 py-3 border border-gray-200 flex justify-start items-center gap-2.5 ${
                pathname === item.href ? "bg-[#FDEBEE]" : "bg-white"
              }`}
            >
              <span
                className={`grow shrink basis-0 text-sm text-start font-medium  ${
                  pathname === item.href ? "text-red-600" : "text-zinc-600"
                }`}
              >
                {item?.text}
              </span>
            </Link>
          ))}

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger className="w-full">
              <div
                className={`w-full pl-4 bg-white pr-4 py-3 border border-gray-200 flex justify-start items-center gap-2.5`}
              >
                <span
                  className={`grow shrink basis-0 text-sm text-start font-medium text-[#54545A]`}
                >
                  Logout
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <ConfirmationModal
                confirmHeading="Are you sure you want to logout?"
                modalType="logout_modal"
                btnName="Logout"
                showModal={showModal}
                btnFunction={logoutHandler}
                cancelFuntion={() => setShowModal(false)}
                isLoading={mutation.isLoading}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={showDelAccModal} onOpenChange={setShowDelAccModal}>
            <DialogTrigger className="w-full">
              <div
                className={`w-full pl-4 pr-4 py-3 bg-white border border-gray-200 flex justify-start items-center gap-2.5 rounded-bl-xl rounded-br-xl`}
              >
                <span
                  className={`grow shrink basis-0 text-sm text-start font-medium  text-[#54545A]`}
                >
                  Delete Account
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <ConfirmationModal
                confirmHeading="Are you sure you want to delete your account?"
                modalType="delete_account_modal"
                btnName="Delete"
                showModal={showDelAccModal}
                btnFunction={deleteAccountHandler}
                cancelFuntion={() => setShowDelAccModal(false)}
                isLoading={mutation.isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
