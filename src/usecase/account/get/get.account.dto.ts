import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputGetAccountDto {
  id: string;
}

export interface OutputGetAccountDto {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  transactions: Transaction[];
}
