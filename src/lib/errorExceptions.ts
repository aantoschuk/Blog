type ErrorConfig = {
  status: number;
  message: string;
};

export const ErrorCode = {
  BadRequest: "BadRequest", // 400
  Unauthenticated: "Unauthenticated", // 401
  Forbidden: "Forbidden", // 403
  MethodNotAllowed: "MethodNotAllowed", //405

  UnknownError: "UnknownError", // 500

  // custom errors
  AlreadyExists: "AlreadyExists",
} as const;

export const errorMap: Record<keyof typeof ErrorCode, ErrorConfig> = {
  BadRequest: {
    status: 400,
    message: "Bad Request",
  },
  Unauthenticated: {
    status: 401,
    message: "Unauthenticated",
  },
  Forbidden: {
    status: 403,
    message: "Forbidden",
  },
  UnknownError: {
    status: 500,
    message: "Unknown Error",
  },
  AlreadyExists: {
    status: 409,
    message: "Record already exists in the database.",
  },
  MethodNotAllowed: {
    status: 405,
    message: "Method Not Allowed",
  },
};
