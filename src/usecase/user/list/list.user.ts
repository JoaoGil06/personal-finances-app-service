import User from "../../../domain/entity/user/user";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import { InputListUserDto, OutputListUserDto } from "./list.user.dto";

export default class ListUsersUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputListUserDto): Promise<OutputListUserDto> {
    const users = await this.userRepository.findAll();
    return OutputMapper.toOutput(users);
  }
}

export class OutputMapper {
  static toOutput(users: User[]): OutputListUserDto {
    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        accounts: user.accountIds,
      })),
    };
  }
}
