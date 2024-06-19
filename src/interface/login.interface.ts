export interface ILogin {
  account: string;
  password: string;
}

export interface IWareHouseProps {
  bounds: IBounds;
  contact: string;
  contactNo: string;
  id: number;
  image: null;
  latitude: string;
  longitude: string;
  outlets: IOutlet[];
  title: string;
}

export interface IOutlet {
  id: number;
  latitude: string;
  longitude: string;
  title: string;
}

export interface IBounds {
  closing_time: string;
  opening_time: string;
}
