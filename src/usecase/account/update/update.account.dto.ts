import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputUpdateAccountDto {
  id: string;
  name?: string;
}

export interface OutputUpdateAccountDto {
  id: string;
  name: string;
  user_id: string;
  balance: number;
  transactions: Transaction[];
}
