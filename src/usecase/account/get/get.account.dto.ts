import { TransactionType } from "../../../domain/entity/transaction/transaction.types";
import { PaginatedResponse } from "../../interfaces/pagination.interface";

type Transaction = {
  id: string;
  account_id: string;
  budget_id?: string;
  pot_id?: string;
  user_id: string;
  amount: number;
  date: Date;
  type: TransactionType;
};

type Budget = {
  id: string;
  name: string;
  maximum_amount: number;
};

type Pot = {
  id: string;
  name: string;
  target_amount: number;
  saved_amount: number;
};

export interface InputGetAccountDto {
  id: string;
  includeTransactions?: boolean;
  limit?: number;
  offset?: number;
}

export interface OutputGetAccountDto {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  budgets: PaginatedResponse<Budget>;
  pots: PaginatedResponse<Pot>;
  _links: {
    self: string;
    transactions: string;
    budgets: string;
    next?: string;
    prev?: string;
  };
  // Só quando o includeTransactions é true
  transactions?: PaginatedResponse<Transaction>;
}
