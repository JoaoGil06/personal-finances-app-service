import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import JWTInterface from "../../interfaces/jwt.interface";
import PasswordHasherInterface from "../../interfaces/password-hasher.interface";
import { InputLoginAuthDto, OutputLoginAuthDto } from "./login.auth.dto";

export default class LoginAuthUseCase {
  private userRepository: UserRepositoryInterface;
  private passwordHasher: PasswordHasherInterface;
  private jsonwebtokenAdapter: JWTInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    passwordHasher: PasswordHasherInterface,
    jsonwebtokenAdapter: JWTInterface
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jsonwebtokenAdapter = jsonwebtokenAdapter;
  }

  async execute(input: InputLoginAuthDto): Promise<OutputLoginAuthDto> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("This e-mail isn't registered.");
    }

    const match = await this.passwordHasher.compare(
      input.password,
      user.password
    );

    if (!match) {
      throw new Error("Password is not correct.");
    }

    const token = this.jsonwebtokenAdapter.sign({
      payload: {
        id: user.id,
        email: user.email,
      },
      secretOrPrivateKey: process.env.JWT_SECRET,
      options: {
        expiresIn: "10d",
      },
    });

    return {
      token,
    };
  }
}
