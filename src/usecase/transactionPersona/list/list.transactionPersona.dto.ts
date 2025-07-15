import { Link, PaginatedResponse } from "../../interfaces/pagination.interface";

export interface InputListTransactionPersonaDto {
  limit?: number;
  offset?: number;
}

type TransactionPersona = {
  id: string;
  image_url: string;
  name: string;
  _links: Link;
};

export type OutputListTransactionPersonaDto =
  PaginatedResponse<TransactionPersona>;
