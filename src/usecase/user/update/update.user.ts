import UserRepository from "../../../infrastructure/repository/user/user.repository";
import PasswordHasherInterface from "../../interfaces/password-hasher.interface";
import { InputUpdateUserDto, OutputUpdateUserDto } from "./update.user.dto";

export default class UpdateUserUseCase {
  private userRepository: UserRepository;
  private passwordHasher: PasswordHasherInterface;

  constructor(
    userRepository: UserRepository,
    passwordHasher: PasswordHasherInterface
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    const user = await this.userRepository.find(input.id);

    if (!user) {
      throw new Error("This user id doesnt match any user.");
    }

    if (input.name) user.changeName(input.name);
    if (input.email) user.changeEmail(input.email);
    if (input.password) {
      const encriptedPassword = await this.passwordHasher.hash(input.password);
      user.changePassword(encriptedPassword);
    }

    await this.userRepository.update(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accounts: user.accountIds,
    };
  }
}
