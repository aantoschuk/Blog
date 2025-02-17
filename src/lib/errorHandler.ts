import type { NextApiRequest, NextApiResponse } from "next";

import CustomError from "./customError";

export const errorHandler = (
  err: CustomError | Error,
  _: NextApiRequest,
  res: NextApiResponse,
) => {

  if (err instanceof CustomError) {
      return res.status(err.status).json({ message: err.message, errorCode: err.status })
  } else {
      return res.status(500).json({ message: "An unexpected error occured" })
  }
};

export const noMatchHandler = (_: NextApiRequest, res: NextApiResponse) => {
    return res.status(500).json({ message: "An unexpected error occurred" });
}
