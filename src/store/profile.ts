import { IProfileShow } from "@/interface/home.interface";
import { create } from "zustand";

interface IProfile {
  profileData: IProfileShow | any;
  setProfileData: (profileData: IProfileShow) => void;
}

export const useProfile = create<IProfile>((set, get) => ({
  profileData: {},
  setProfileData: (profileData) => {
    set(() => ({ profileData: profileData }));
  },
}));
