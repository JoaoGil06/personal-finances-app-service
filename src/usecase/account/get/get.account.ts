import Transaction from "../../../domain/entity/transaction/transaction";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import { InputGetAccountDto, OutputGetAccountDto } from "./get.account.dto";

export default class GetAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputGetAccountDto): Promise<OutputGetAccountDto> {
    const account = await this.accountRepository.find(input.id, {
      includeTransactions: input.includeTransactions,
      limit: input.limit,
      offset: input.offset,
    });

    if (!account) {
      throw new Error("This account doesnt exist.");
    }

    const baseUrl = `/account/${account.id}`;
    const outputDto: OutputGetAccountDto = {
      id: account.id,
      name: account.name,
      balance: account.balance,
      user_id: account.user_id,
      _links: {
        self: baseUrl,
        transactions: `${baseUrl}/transactions/?limit=${input.limit}&offset=${input.offset}`,
      },
    };

    if (input.includeTransactions) {
      outputDto.transactions = {
        items: account.transactions.map((transaction: Transaction) => ({
          id: transaction.id,
          account_id: transaction.account_id,
          budget_id: transaction.budget_id,
          user_id: transaction.user_id,
          amount: transaction.amount,
          date: transaction.date,
          type: transaction.type,
        })),
        page: {
          total: account.total_transaction,
          limit: input.limit,
          offset: input.offset,
        },
      };

      const nextOffset =
        outputDto.transactions.page.offset + outputDto.transactions.page.limit;
      if (nextOffset < outputDto.transactions.page.total) {
        outputDto._links.next = `${baseUrl}?include=transactions&limit=${outputDto.transactions.page.limit}&offset=${nextOffset}`;
      }

      if (outputDto.transactions.page.offset > 0) {
        const prev = Math.max(
          outputDto.transactions.page.offset -
            outputDto.transactions.page.limit,
          0
        );
        outputDto._links.prev = `${baseUrl}?include=transactions&limit=${outputDto.transactions.page.limit}&offset=${prev}`;
      }
    }

    return outputDto;
  }
}
