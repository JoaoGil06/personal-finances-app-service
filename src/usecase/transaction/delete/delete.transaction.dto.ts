import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputDeleteTransactionDto {
  id: string;
}

export interface OutputDeleteTransactionDto {
  id: string;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
}
