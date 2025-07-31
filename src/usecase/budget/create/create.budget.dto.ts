export interface InputCreateBudgetDto {
  name: string;
  account_id: string;
  maximum_amount: number;
}

export interface OutputCreateBudgetDto {
  id: string;
  name: string;
  account_id: string;
  maximum_amount: number;
}
