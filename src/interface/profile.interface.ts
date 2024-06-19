export interface IProfile {
  first_name: string;
  last_name: string;
  mobile_number: string;
}
export interface IProfileSubmit {
  first_name: string;
  last_name: string;
  mobile_number: number;
}

export interface IProfileImage {
  image: File;
}
