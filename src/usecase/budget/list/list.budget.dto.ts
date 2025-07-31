import { TransactionType } from "../../../domain/entity/transaction/transaction.types";
import { PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListBudgetDto {
  account_id: string;
  limit?: number;
  offset?: number;
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

type Budget = {
  id: string;
  name: string;
  account_id: string;
  maximum_amount: number;
  recentFiveTransactions: Transaction[];
  spent: number;
  remaining: number;
};

export type OutputListBudgetDto = PaginatedResponse<Budget>;
