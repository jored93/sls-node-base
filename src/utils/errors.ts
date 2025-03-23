class DniNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class I2CError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidOperation extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const ERROR = {
  DniNotFoundError,
  BadRequestError,
  InvalidTokenError,
  I2CError,
  InvalidOperation
};
