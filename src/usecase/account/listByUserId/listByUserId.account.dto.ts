import { Link, PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListAccountByUserIdDto {
  user_id: string;
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

export type OutputListAccountByUserIdDto = PaginatedResponse<Account>;
