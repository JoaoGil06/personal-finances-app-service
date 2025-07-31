import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import {
  InputDeleteBudgetDto,
  OutputDeleteBudgetDto,
} from "./delete.budget.dto";

export default class DeleteBudgetUseCase {
  private budgetRepository: BudgetRepositoryInterface;
  private transactionRepository: TransactionRepositoryInterface;

  constructor(
    budgetRepository: BudgetRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface
  ) {
    this.budgetRepository = budgetRepository;
    this.transactionRepository = transactionRepository;
  }

  async execute(input: InputDeleteBudgetDto): Promise<OutputDeleteBudgetDto> {
    const budget = await this.budgetRepository.find(input.id);

    if (!budget) {
      throw new Error("This budget id doesnt match any budget.");
    }

    // Verifica se o budget tem transações associadas
    const isUsed = await this.transactionRepository.existsWithBudget(input.id);
    if (isUsed) {
      throw new Error(
        "Cannot delete this budget: it has associated transactions."
      );
    }

    await this.budgetRepository.delete(input.id);

    return {
      id: budget.id,
      name: budget.name,
    };
  }
}
