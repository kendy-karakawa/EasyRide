import { ApplicationError } from "../types/protocols";

export function notFoundError(error_code: string, error_description:string): ApplicationError {
  return {
    error_code,
    error_description,
  };
}
