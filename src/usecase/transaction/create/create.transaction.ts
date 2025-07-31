import TransactionProcessorService from "../../../service/transaction/transactionProcessor.service";
import {
  InputCreateTransactionDto,
  OutputCreateTransactionDto,
} from "./create.transaction.dto";

export default class CreateTransactionUseCase {
  private transactionProcess: TransactionProcessorService;

  constructor(transactionProcess: TransactionProcessorService) {
    this.transactionProcess = transactionProcess;
  }

  async execute(
    input: InputCreateTransactionDto
  ): Promise<OutputCreateTransactionDto> {
    const transaction = await this.transactionProcess.process(input);

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
