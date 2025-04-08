import jwt from "jsonwebtoken";
import JWTAdapterInterface, {
  SignMethodInput,
  VerifyMethodInput,
} from "../../usecase/interfaces/jwt.interface";

export class Jsonwebtoken implements JWTAdapterInterface {
  sign(input: SignMethodInput): string {
    const token = jwt.sign(
      input.payload,
      input.secretOrPrivateKey,
      input.options
    );
    return token;
  }

  verify(input: VerifyMethodInput): void {
    jwt.verify(input.token, input.secretOrPublicKey, input?.callback);
  }
}
