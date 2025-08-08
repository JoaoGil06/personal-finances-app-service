import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { buildPaginatedResponse } from "../../shared/pagination";
import {
  InputListAccountByUserIdDto,
  OutputListAccountByUserIdDto,
} from "./listByUserId.account.dto";

export default class ListAccountsByUserIdUseCase {
  private accountRepository: AccountRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    accountRepository: AccountRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }

  async execute(
    input: InputListAccountByUserIdDto
  ): Promise<OutputListAccountByUserIdDto> {
    const cached = await CacheService.get(`accounts:${input.user_id}`);
    if (cached) return cached;

    const userId = await this.userRepository.find(input.user_id);

    if (!userId) {
      throw new Error("This user doesnt exist.");
    }

    const accounts = await this.accountRepository.findAllByUserId(
      input.user_id,
      {
        limit: input.limit,
        offset: input.offset,
      }
    );

    const baseUrl = `/account/list-by-user/${input.user_id}`;

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
        self: `/account/${account.id}`,
        transactions: `/transaction/list-by-account/${account.id}?limit=20&offset=0`,
        budgets: `/budget/list-by-account/${account.id}?limit=20&offset=0`,
      }),
    });

    await CacheService.set(`accounts:${input.user_id}`, paginatedResponse);

    return paginatedResponse;
  }
}
