export class ProfileAlreadyExistsError extends Error {
  constructor() {
    super("Já existe um perfil com esse CPF");
  }
}
