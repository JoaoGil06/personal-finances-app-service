export interface InputUpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface OutputUpdateUserDto {
  id: string;
  name: string;
  email: string;
  accounts: string[];
}
