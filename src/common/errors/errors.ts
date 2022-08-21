export class ObjectNotFound extends Error {
  constructor(message?: string) {
    super();
    this.name = "ObjectNotFound";
    if (message) {
      this.message = message;
    }
  }
}

export class PermissionDeniedError extends Error {
  constructor(message?: string) {
    super();
    this.name = "PermissionDeniedError";
    if (message) {
      this.message = message;
    }
  }
}

export class InvalidUsernameOrPassword extends Error {
  constructor() {
    super();
    this.name = "InvalidUsernameOrPassword";
  }
}
