import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputListAccountDto {}

type Account = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  transactions: Transaction[];
};

export interface OutputListAccountDto {
  accounts: Account[];
}
