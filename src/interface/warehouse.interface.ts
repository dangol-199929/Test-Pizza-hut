
export interface IWareHouseOutlet {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
}

export interface IWarehouseBounds {
  closing_time: string;
  east: number;
  minZoom: number;
  north: number;
  opening_time: string;
  south: number;
  west: number;
}


export interface IWareHouse {
  bounds: IWarehouseBounds;
  contact: string;
  contactNo: string;
  id: number;
  latitude: string;
  longitude: string;
  outlets: Array<IWareHouseOutlet>;
  title: string;
}