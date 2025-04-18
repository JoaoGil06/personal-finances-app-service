export interface InputGetUserDto {
  id: string;
}

export interface OutputGetUserDto {
  id: string;
  name: string;
  email: string;
  accounts: string[];
}
