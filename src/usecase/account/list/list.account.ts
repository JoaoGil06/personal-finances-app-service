import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { buildPaginatedResponse } from "../../shared/pagination";
import { InputListAccountDto, OutputListAccountDto } from "./list.account.dto";

export default class ListAccountsUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputListAccountDto): Promise<OutputListAccountDto> {
    const cached = await CacheService.get("accounts");
    if (cached) return cached;

    const accounts = await this.accountRepository.findAll({
      limit: input.limit,
      offset: input.offset,
    });

    const baseUrl = `/account`;

    const dtoItems = accounts.map((account) => ({
      id: account.id,
      name: account.name,
      balance: account.balance,
      user_id: account.user_id,
    }));

    const paginatedResponse = buildPaginatedResponse({
      items: dtoItems,
      total: accounts.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (account) => ({
        self: `${baseUrl}/${account.id}`,
        transactions: `/transaction/list-by-account/${account.id}?limit=20&offset=0`,
        budgets: `/budget/list-by-account/${account.id}?limit=20&offset=0`,
      }),
    });

    await CacheService.set(`accounts:`, paginatedResponse);

    return paginatedResponse;
  }
}
