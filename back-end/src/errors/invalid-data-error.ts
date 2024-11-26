import { ApplicationError } from "../types/protocols";

export function invalidDataError(description: string): ApplicationError {
  return {
    error_code: "INVALID_DATA",
    error_description: description,
  };
}
