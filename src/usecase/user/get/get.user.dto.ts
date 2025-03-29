export interface InputGetUserDto {
  id: string;
}

export interface OutputGetUserDto {
  id: string;
  name: string;
  email: string;
  accounts: string[]; // TO - DO: Replace this by an array of accounts (for now we don't have this)
}
