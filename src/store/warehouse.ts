import { create } from "zustand";

interface IWareHouse {
  warehouseId: string;
  setWareHouseId: (warehouseId: string) => void;

  // warehouseName: string;
  // setWarehouseName: (warehouseName: string) => void;
}

export const useWareHouse = create<IWareHouse>((set, get) => ({
  warehouseId: "",
  setWareHouseId: (warehouseId) => {
    set(() => ({ warehouseId: warehouseId }));
  },

  // warehouseName: "",
  // setWarehouseName: (warehouseName) => {
  //   set(() => ({ warehouseName: warehouseName }));
  // },
}));
