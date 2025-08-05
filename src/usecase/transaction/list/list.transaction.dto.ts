import { TransactionType } from "../../../domain/entity/transaction/transaction.types";
import { Link, PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListTransactionByAccountIdDto {
  account_id: string;
  limit?: number;
  offset?: number;
}

type Transaction = {
  id: string;
  account_id: string;
  budget_id?: string;
  pot_id?: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  amount: number;
  _links: Link;
};

export type OutputListTransactionByAccountIdDto =
  PaginatedResponse<Transaction>;
