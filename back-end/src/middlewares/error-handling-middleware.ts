import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../types/protocols";

export function handleApplicationErrors(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
    if (err.error_code === "INVALID_DATA") {
        res.status(400).send({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos."
        });
        return;
    }

    if (err.error_code === "INVALID_DRIVER") {
        res.status(400).send({
            error_code: "INVALID_DRIVER",
            error_description: "Motorista invalido."
        });
        return;
    }

    if (err.error_code === "DRIVER_NOT_FOUND") {
        res.status(404).send({
            error_code: "DRIVER_NOT_FOUND",
            error_description: "Motorista não encontrado."
        });
        return;
    }

    if (err.error_code === "NO_RIDES_FOUND") {
        res.status(404).send({
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhum registro encontrado."
        });
        return;
    }

    console.log(err)

    if (err.error_code === "INVALID_DISTANCE") {
        res.status(406).send({
            error_code: "INVALID_DISTANCE",
            error_description: "Quilometragem invalida para o motorista."
        });
        return;
    }
  
    res.status(503).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}


