import { ApplicationError } from "../types/protocols";

export function invalidDriverError(): ApplicationError {
  return {
    error_code: "INVALID_DRIVER",
    error_description: "Motorista invalido.",
  };
}
