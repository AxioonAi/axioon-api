export class PlanNotFoundError extends Error {
  constructor() {
    super("Plano não encontrado");
  }
}
