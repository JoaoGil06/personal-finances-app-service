import TransactionPersonaFactory from "../../../domain/entity/transactionPersona/factory/transactionPersona.factory";
import TransactionPersona from "../../../domain/entity/transactionPersona/transactionPersona";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import TransactionPersonaModel from "../../db/sequelize/model/transactionPersona.model";

export default class TransactionPersonaRepository
  implements TransactionPersonaRepositoryInterface
{
  async create(entity: TransactionPersona): Promise<void> {
    await TransactionPersonaModel.create({
      id: entity.id,
      name: entity.name,
      image_url: entity.image_url,
    });
  }
  async update(entity: TransactionPersona): Promise<void> {
    await TransactionPersonaModel.update(
      {
        name: entity.name,
        image_url: entity.image_url,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async delete(id: string): Promise<void> {
    await TransactionPersonaModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string): Promise<TransactionPersona> {
    let transactionModel;
    try {
      transactionModel = await TransactionPersonaModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const { id: transaction_persona_id, name, image_url } = transactionModel;

    const transactionPersona = TransactionPersonaFactory.create(
      name,
      image_url,
      transaction_persona_id
    );

    return transactionPersona;
  }
  async findAll(
    paginationOptions: PaginationOptions = {}
  ): Promise<TransactionPersona[]> {
    const transactionPersonaModel = await TransactionPersonaModel.findAll({
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const transactionsPersonas = transactionPersonaModel.map(
      (transactionPersona) => {
        return TransactionPersonaFactory.create(
          transactionPersona.name,
          transactionPersona.image_url,
          transactionPersona.id
        );
      }
    );

    return transactionsPersonas;
  }
}
