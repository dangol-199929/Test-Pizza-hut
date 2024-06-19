import { IWareHouseProps } from "@/interface/login.interface";
import { CookieKeys, LocalKeys } from "@/shared/enum";

export const addWareHouseToStorage = (data: IWareHouseProps[]) => {
    const id = data && data[0]?.id;

    if (!localStorage?.getItem(LocalKeys.WAREHOUSE_ID)) {
        localStorage?.setItem(LocalKeys.WAREHOUSE_ID, id.toString());
        // localStorage?.setItem("warehouse_name", name);
    }
};

export const getWareId = () => {
    if (typeof window !== "undefined") {
        const id =
            localStorage?.getItem(LocalKeys.WAREHOUSE_ID) &&
            localStorage?.getItem(LocalKeys.WAREHOUSE_ID);
        return id || "";
    }
};
// export const getWarehouseName = () => {
//   if (typeof window !== "undefined") {
//     const name =
//       localStorage?.getItem("warehouse_name") &&
//       localStorage?.getItem("warehouse_name");
//     return name || "";
//   }
// };
