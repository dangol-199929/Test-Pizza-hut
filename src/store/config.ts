import { IConfig } from "../interface/config.interface";
import { create } from "zustand";

interface IStore {
  configs: string;
  setConfig: (config: string) => void;
  configData: IConfig | any;
  setConfigData: (configData: IConfig | any) => void;
}

export const useConfig = create<IStore>((set, get) => ({
  configs: "",
  setConfig: (configs) => {
    set(() => ({ configs: configs }));
  },

  configData: {},
  setConfigData: (data) => {
    set(() => ({ configData: data }));
  },
}));
