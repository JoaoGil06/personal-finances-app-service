import {
  JwtPayload,
  PrivateKey,
  PublicKey,
  Secret,
  SignOptions,
  VerifyCallback,
} from "jsonwebtoken";

export type SignMethodInput = {
  payload: string | Buffer | object;
  secretOrPrivateKey: Secret | PrivateKey;
  options?: SignOptions;
};

export type VerifyMethodInput = {
  token: string;
  secretOrPublicKey: Secret | PublicKey;
  callback?: VerifyCallback<JwtPayload | string>;
};

export default interface JWTAdapterInterface {
  sign(input: SignMethodInput): string;
  verify(input: VerifyMethodInput): void;
}
