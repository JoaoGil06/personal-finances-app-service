import Pot from "../../domain/entity/pot/pot";
import Transaction from "../../domain/entity/transaction/transaction";

export default class PotTransactionRouter {
  static route(transaction: Transaction, pots: Pot[]): void {
    const targetPot = pots.find((p) => p.id === transaction.pot_id);

    if (!targetPot) {
      // Ignorar: a transação pode não ter pot (ou o pot não está carregado)
      return;
    }

    targetPot.addTransaction(transaction);
  }
}
