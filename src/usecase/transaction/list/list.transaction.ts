import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import { buildPaginatedResponse } from "../../shared/pagination";
import {
  InputListTransactionByAccountIdDto,
  OutputListTransactionByAccountIdDto,
} from "./list.transaction.dto";

export default class ListTransactionsByAccountIdUseCase {
  private transactionRepository: TransactionRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;

  constructor(
    transactionRepository: TransactionRepositoryInterface,
    accountRepository: AccountRepositoryInterface
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  async execute(
    input: InputListTransactionByAccountIdDto
  ): Promise<OutputListTransactionByAccountIdDto> {
    const accountId = await this.accountRepository.find(input.account_id);

    if (!accountId) {
      throw new Error("This account doesnt exist.");
    }

    const transactions = await this.transactionRepository.findAllByAccountId(
      input.account_id,
      {
        limit: input.limit,
        offset: input.offset,
      }
    );

    const baseUrl = `/transaction/${input.account_id}`;

    const dtoItems = transactions.map((transaction) => ({
      id: transaction.id,
      account_id: transaction.account_id,
      budget_id: transaction.budget_id,
      user_id: transaction.user_id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
    }));

    return buildPaginatedResponse({
      items: dtoItems,
      total: transactions.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (transaction) => ({
        self: `/transaction/${transaction.id}`,
      }),
    });
  }
}
