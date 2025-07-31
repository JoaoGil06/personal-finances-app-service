import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import { InputGetBudgetDto, OutputGetBudgetDto } from "./get.budget.dto";

export default class GetBudgetUseCase {
  private budgetRepository: BudgetRepositoryInterface;

  constructor(budgetRepository: BudgetRepositoryInterface) {
    this.budgetRepository = budgetRepository;
  }

  async execute(input: InputGetBudgetDto): Promise<OutputGetBudgetDto> {
    const budget = await this.budgetRepository.find(input.id);

    if (!budget) {
      throw new Error("This budget doesnt exist.");
    }

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
