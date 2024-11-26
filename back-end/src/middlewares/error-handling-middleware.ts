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
            error_code: err.error_code,
            error_description: err.error_description
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

    if (err.error_code === "DRIVER_NOT_FOUND" || err.error_code === "GOOGLE_API_KEY_NOT_FOUND" || err.error_code === "NO_RIDES_FOUND") {
        res.status(404).send({
            error_code: err.error_code,
            error_description: err.error_description
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
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Internal Server Error",
    });
}


