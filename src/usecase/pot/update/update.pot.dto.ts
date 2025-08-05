import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputUpdatePotDto {
  id: string;
  name?: string;
  target_amount?: number;
}

type Transaction = {
  id: string;
  account_id: string;
  pot_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
};

export interface OutputUpdatePotDto {
  id: string;
  name: string;
  account_id: string;
  saved_amount: number;
  target_amount: number;
  recentFiveTransactions: Transaction[];
  progress: string;
}
