import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { InputGetUserDto, OutputGetUserDto } from "./get.user.dto";

export default class GetUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputGetUserDto): Promise<OutputGetUserDto> {
    const cached = await CacheService.get(`user:${input.id}`);
    if (cached) return cached;

    const user = await this.userRepository.find(input.id);

    if (!user) {
      throw new Error("This user doesnt exist.");
    }

    await CacheService.set(`user:${input.id}`, user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accounts: user.accountIds,
    };
  }
}
