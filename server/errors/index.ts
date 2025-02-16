export class CustomError extends Error {
  constructor(public statusCode: number, public statusMessage: string, public data?: any) {
    super(statusMessage);
  }
}

// Erro 400 - Requisição inválida
export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, !message ? 'Bad Request' : `Bad Request: ${message}`);
  }
}

// Erro 401 - Não autenticado
export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(401, !message ? 'Unauthorized' : `Unauthorized: ${message}`);
  }
}

// Erro 403 - Acesso negado
export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(403, !message ? 'Forbidden' : `Forbidden: ${message}`);
  }
}

// Erro 404 - Recurso não encontrado
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, !message ? 'Not Found' : `Not Found: ${message}`);
  }
}

// Erro 422 - Erro de validação
export class ValidationError extends CustomError {
  constructor(message: string, data?: string[]) {
    super(422, !message ? 'Validation Error' : `Validation Error: ${message}`, data);
  }
}

// Erro 500 - Erro interno do servidor
export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(500, !message ? 'Internal Server Error' : `Internal Server Error: ${message}`);
  }
}

// Erro 409 - Conflito: Recurso já existe
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(409, !message ? 'Conflict' : `Conflict: ${message}`);
  }
}
