import { ApplicationError } from "../types/protocols";

export function invalidDistanceError(): ApplicationError {
  return {
    error_code: "INVALID_DISTANCE",
    error_description: "Quilometragem invalida para o motorista.",
  };
}
