import { Link, PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListAccountDto {
  limit?: number;
  offset?: number;
}

export type AccountLinks = {
  transactions: string;
};

type Account = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  _links: Link & AccountLinks;
};

export type OutputListAccountDto = PaginatedResponse<Account>;
