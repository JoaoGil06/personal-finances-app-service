import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import { InputDeleteUserDto, OutputDeleteUserDto } from "./delete.user.dto";

export default class DeleteUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    const user = await this.userRepository.find(input.id);

    if (!user) {
      throw new Error("This user id doesnt match any user.");
    }

    await this.userRepository.delete(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
