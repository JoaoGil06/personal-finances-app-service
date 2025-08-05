import { TransactionType } from "../../../domain/entity/transaction/transaction.types";
import { PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListPotDto {
  account_id: string;
  limit?: number;
  offset?: number;
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

type Pot = {
  id: string;
  name: string;
  account_id: string;
  saved_amount: number;
  target_amount: number;
  recentFiveTransactions: Transaction[];
  progress: string;
};

export type OutputListPotDto = PaginatedResponse<Pot>;
