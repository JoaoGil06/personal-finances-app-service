export interface InputCreatePotDto {
  name: string;
  account_id: string;
  target_amount: number;
  saved_amount: number;
}

export interface OutputCreatePotDto {
  id: string;
  name: string;
  account_id: string;
  target_amount: number;
  saved_amount: number;
}
