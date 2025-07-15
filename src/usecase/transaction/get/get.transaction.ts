import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import {
  InputGetTransactionDto,
  OutputGetTransactionDto,
} from "./get.transaction.dto";

export default class GetTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor(transactionRepository: TransactionRepositoryInterface) {
    this.transactionRepository = transactionRepository;
  }

  async execute(
    input: InputGetTransactionDto
  ): Promise<OutputGetTransactionDto> {
    const transaction = await this.transactionRepository.find(input.id);

    if (!transaction) {
      throw new Error("This transaction doesnt exist.");
    }

    return {
      id: transaction.id,
      account_id: transaction.account_id,
      budget_id: transaction.budget_id,
      user_id: transaction.user_id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
      transaction_persona_id: transaction.transaction_persona_id,
    };
  }
}
