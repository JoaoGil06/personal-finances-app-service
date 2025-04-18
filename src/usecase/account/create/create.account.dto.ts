import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputCreateAccountDto {
  name: string;
  user_id: string;
  balance: number;
}

export interface OutputCreateAccountDto {
  id: string;
  name: string;
  user_id: string;
  balance: number;
  transactions: Transaction[];
}
