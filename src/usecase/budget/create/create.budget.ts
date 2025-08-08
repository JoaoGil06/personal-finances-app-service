import BudgetFactory from "../../../domain/entity/budget/factory/budget.factory";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import BudgetService from "../../../service/budget/budget.service";
import {
  InputCreateBudgetDto,
  OutputCreateBudgetDto,
} from "./create.budget.dto";

export default class CreateBudgetUseCase {
  private budgetRepository: BudgetRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;

  constructor(
    budgetRepository: BudgetRepositoryInterface,
    accountRepository: AccountRepositoryInterface
  ) {
    this.budgetRepository = budgetRepository;
    this.accountRepository = accountRepository;
  }

  async execute(input: InputCreateBudgetDto): Promise<OutputCreateBudgetDto> {
    const budget = BudgetFactory.create(
      input.name,
      input.account_id,
      input.maximum_amount
    );

    const account = await this.accountRepository.find(input.account_id);

    BudgetService.assignBudgetToAccount(budget, account);

    await this.budgetRepository.create(budget);

    await CacheService.del(`budgets:${budget.account_id}`);

    return {
      id: budget.id,
      account_id: budget.account_id,
      name: budget.name,
      maximum_amount: budget.maximum_amount,
    };
  }
}
