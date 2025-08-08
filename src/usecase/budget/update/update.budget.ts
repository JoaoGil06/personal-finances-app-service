import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import BudgetService from "../../../service/budget/budget.service";
import {
  InputUpdateBudgetDto,
  OutputUpdateBudgetDto,
} from "./update.budget.dto";

export default class UpdateBudgetUseCase {
  private budgetRepository: BudgetRepositoryInterface;

  constructor(budgetRepository: BudgetRepositoryInterface) {
    this.budgetRepository = budgetRepository;
  }

  async execute(input: InputUpdateBudgetDto): Promise<OutputUpdateBudgetDto> {
    const budget = await this.budgetRepository.find(input.id);

    if (!budget) {
      throw new Error("This budget id doesnt match any budget.");
    }

    if (input.name) budget.changeName(input.name);
    if (input.maximum_amount) budget.changeMaximumAmount(input.maximum_amount);

    await this.budgetRepository.update(budget);

    const recentFiveTransactionsDto = budget
      .getMostRecentFiveTransactions()
      .map((transaction) => ({
        id: transaction.id,
        account_id: transaction.account_id,
        budget_id: transaction.budget_id,
        user_id: transaction.user_id,
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount,
        transaction_persona_id: transaction.transaction_persona_id,
      }));

    await BudgetService.deleteCachedResults(budget.id, budget.account_id);

    return {
      id: budget.id,
      name: budget.name,
      account_id: budget.account_id,
      maximum_amount: budget.maximum_amount,
      recentFiveTransactions: recentFiveTransactionsDto,
      spent: budget.getSpent(),
      remaining: budget.getRemaining(),
    };
  }
}
