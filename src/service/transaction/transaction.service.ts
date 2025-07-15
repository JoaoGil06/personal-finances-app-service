import Transaction from "../../domain/entity/transaction/transaction";
import TransactionPersona from "../../domain/entity/transactionPersona/transactionPersona";

export default class TransactionService {
  static associateTransactionWithTransactionPersona(
    transaction: Transaction,
    transactionPersona: TransactionPersona
  ) {
    if (
      transaction.transaction_persona_id &&
      transaction.transaction_persona_id !== transactionPersona.id
    ) {
      throw new Error(
        "Transaction already is associated with another Persona."
      );
    }
    transaction.setTransactionPersona(transactionPersona.id);
  }
}
