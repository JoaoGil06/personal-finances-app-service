import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import { buildPaginatedResponse } from "../../shared/pagination";
import { InputListUserDto, OutputListUserDto } from "./list.user.dto";

export default class ListUsersUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputListUserDto): Promise<OutputListUserDto> {
    const users = await this.userRepository.findAll({
      limit: input.limit,
      offset: input.offset,
    });

    const dtoItems = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      accounts: user.accountIds,
    }));

    const baseUrl = `/user`;
    return buildPaginatedResponse({
      items: dtoItems,
      total: users.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (user) => ({
        self: `${baseUrl}/${user.id}`,
      }),
    });
  }
}
