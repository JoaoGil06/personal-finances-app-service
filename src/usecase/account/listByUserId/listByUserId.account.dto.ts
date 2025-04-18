import Transaction from "../../../domain/entity/transaction/transaction";

export interface InputListAccountByUserIdDto {
  id: string;
}

type Account = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  transactions: Transaction[];
};

export interface OutputListAccountByUserIdDto {
  accounts: Account[];
}
