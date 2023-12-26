export class MonitoringNotFoundError extends Error {
  constructor() {
    super("Você não possui acesso a este Perfil");
  }
}
