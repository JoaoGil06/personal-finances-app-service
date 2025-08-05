import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputGetTransactionDto {
  id: string;
}

export interface OutputGetTransactionDto {
  id: string;
  account_id: string;
  budget_id?: string;
  pot_id?: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
  transaction_persona_id: string;
}
