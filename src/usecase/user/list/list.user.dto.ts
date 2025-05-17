import { Link, PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListUserDto {
  limit?: number;
  offset?: number;
}

type User = {
  id: string;
  name: string;
  email: string;
  accounts: string[];
  _links: Link;
};

export type OutputListUserDto = PaginatedResponse<User>;
