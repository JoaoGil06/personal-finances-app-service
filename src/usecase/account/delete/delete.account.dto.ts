import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputDeleteAccountDto {
  id: string;
}

export interface OutputDeleteAccountDto {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  transactions: Transaction[];
}
