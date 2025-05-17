import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputCreateTransactionDto {
  amount: number;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
}

export interface OutputCreateTransactionDto {
  id: string;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
}
