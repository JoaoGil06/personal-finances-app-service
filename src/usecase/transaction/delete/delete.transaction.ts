import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import {
  InputDeleteTransactionDto,
  OutputDeleteTransactionDto,
} from "./delete.transaction.dto";

export default class DeleteTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor(transactionRepository: TransactionRepositoryInterface) {
    this.transactionRepository = transactionRepository;
  }

  async execute(
    input: InputDeleteTransactionDto
  ): Promise<OutputDeleteTransactionDto> {
    const transaction = await this.transactionRepository.find(input.id);

    if (!transaction) {
      throw new Error("This transaction id doesnt match any transaction.");
    }

    await this.transactionRepository.delete(transaction.id);

    return {
      id: transaction.id,
      account_id: transaction.account_id,
      budget_id: transaction.budget_id,
      user_id: transaction.user_id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
    };
  }
}
