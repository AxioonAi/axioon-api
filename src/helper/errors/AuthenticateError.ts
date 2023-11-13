export class AuthenticateError extends Error {
  constructor() {
    super("Email ou senha incorretos");
  }
}
