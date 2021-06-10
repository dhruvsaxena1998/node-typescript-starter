import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class ApiError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static error(code: string) {
    /*
     ErrorCodes are specific to postgresql
     Learn more: https://www.postgresql.org/docs/9.2/errcodes-appendix.html 
    */
    const errorcodes: { [key: string]: Function } = {
      "23505": () => ApiError.badRequest("Unique key violation"),
    };

    if (errorcodes[code]) {
      return errorcodes[code]();
    }

    return ApiError.internalError();
  }

  static internalError(message = "Internal server error.") {
    return new ApiError(500, message);
  }
}

export default (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).send(error.message);
  }

  return res.status(500).send("Something went wrong");
};
