export interface IForgotPassword {
  account: string;
}

export interface IResetPassword {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface IChangePassword {
  old_password: string;
  password: string;
  password_confirmation: string;
}
