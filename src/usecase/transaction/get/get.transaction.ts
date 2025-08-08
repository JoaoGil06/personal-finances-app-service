import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
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
    const cached = await CacheService.get(`transaction:${input.id}`);
    if (cached) return cached;

    const transaction = await this.transactionRepository.find(input.id);

    if (!transaction) {
      throw new Error("This transaction doesnt exist.");
    }

    await CacheService.set(`transaction:${input.id}`, transaction);

    return {
      id: transaction.id,
      account_id: transaction.account_id,
      budget_id: transaction.budget_id,
      pot_id: transaction.pot_id,
      user_id: transaction.user_id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
      transaction_persona_id: transaction.transaction_persona_id,
    };
  }
}
