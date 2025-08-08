import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { buildPaginatedResponse } from "../../shared/pagination";
import {
  InputListTransactionPersonaDto,
  OutputListTransactionPersonaDto,
} from "./list.transactionPersona.dto";

export default class ListTransactionsPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
  }

  async execute(
    input: InputListTransactionPersonaDto
  ): Promise<OutputListTransactionPersonaDto> {
    const cached = await CacheService.get(`transactionPersona`);
    if (cached) return cached;

    const transactionsPersonas =
      await this.transactionPersonaRepository.findAll({
        limit: input.limit,
        offset: input.offset,
      });

    const baseUrl = `/transaction-personas/`;

    const dtoItems = transactionsPersonas.map((transactionPersona) => ({
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    }));

    const paginatedResponse = buildPaginatedResponse({
      items: dtoItems,
      total: transactionsPersonas.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (transactionPersona) => ({
        self: `/transaction-personas/${transactionPersona.id}`,
      }),
    });

    await CacheService.set(`transactionPersonas`, paginatedResponse);

    return paginatedResponse;
  }
}
