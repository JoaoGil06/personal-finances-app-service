import { TransactionType } from "../../../domain/entity/transaction/transaction.types";

export interface InputCreateTransactionDto {
  amount: number;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  transaction_persona_id: string;
}

export interface OutputCreateTransactionDto {
  id: string;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
  transaction_persona_id: string;
}
