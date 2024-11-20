import { ApplicationError } from "../types/protocols";


export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    error_code: "INVALID_DATA",
    error_description: 'Os dados fornecidos no corpo da requisição são inválidos.',
    details: details
  };
}


type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
