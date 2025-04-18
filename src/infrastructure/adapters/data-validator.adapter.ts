import Validator from "validator";
import DataValidatorInterface from "../../usecase/interfaces/data-validator.interface";

export class DataValidator implements DataValidatorInterface {
  validateEmail(value: string): Boolean {
    return Validator.isEmail(value);
  }
  validatePassword(value: string): Boolean {
    return Validator.isStrongPassword(value);
  }
  validateNumber(value: number): boolean {
    if (typeof value !== "number") {
      return false;
    }
    if (!Number.isFinite(value)) {
      return false;
    }
    return true;
  }
}
