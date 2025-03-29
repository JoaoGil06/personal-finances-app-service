import UserFactory from "../../../domain/entity/user/factory/user.factory";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import PasswordHasherInterface from "../../interfaces/password-hasher.interface";
import { InputCreateUserDto, OutputCreateUserDto } from "./create.user.dto";

export default class CreateUserUseCase {
  private userRepository: UserRepositoryInterface;
  private passwordHasher: PasswordHasherInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    passwordHasher: PasswordHasherInterface
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error("This email is already registered.");
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = UserFactory.create(input.name, input.email, passwordHash);

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
