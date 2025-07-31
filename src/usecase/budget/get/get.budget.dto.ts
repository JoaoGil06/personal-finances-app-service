import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputGetBudgetDto {
  id: string;
}

type Transaction = {
  id: string;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
};

export interface OutputGetBudgetDto {
  id: string;
  name: string;
  account_id: string;
  maximum_amount: number;
  recentFiveTransactions: Transaction[];
  spent: number;
  remaining: number;
}
