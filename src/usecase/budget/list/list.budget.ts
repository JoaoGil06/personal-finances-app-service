import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { buildPaginatedResponse } from "../../shared/pagination";
import { InputListBudgetDto, OutputListBudgetDto } from "./list.budget.dto";

export default class ListBudgetsUseCase {
  private budgetRepository: BudgetRepositoryInterface;

  constructor(budgetRepository: BudgetRepositoryInterface) {
    this.budgetRepository = budgetRepository;
  }

  async execute(input: InputListBudgetDto): Promise<OutputListBudgetDto> {
    const cached = await CacheService.get(`budgets:${input.account_id}`);
    if (cached) return cached;

    const budgets = await this.budgetRepository.findAllByAccountId(
      input.account_id,
      {
        limit: input.limit,
        offset: input.offset,
      }
    );
    const dtoItems = budgets.map((budget) => ({
      id: budget.id,
      name: budget.name,
      account_id: budget.account_id,
      maximum_amount: budget.maximum_amount,
      recentFiveTransactions: budget.getMostRecentFiveTransactions(),
      spent: budget.getSpent(),
      remaining: budget.getRemaining(),
    }));

    const baseUrl = `/budget/list-by-account/${input.account_id}`;

    const paginatedResponse = buildPaginatedResponse({
      items: dtoItems,
      total: budgets.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (budget) => ({
        self: `budget/${budget.id}`,
      }),
    });

    await CacheService.set(`budgets:${input.account_id}`, paginatedResponse);

    return paginatedResponse;
  }
}
