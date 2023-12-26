export class SignatureNotFoundError extends Error {
  constructor() {
    super("Assinatura vencida ou não encontrada");
  }
}
